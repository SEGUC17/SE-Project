var passport = require('passport');
var mailer = require('./MailController')
var crypto = require('crypto')
var Client = require('../models/client')
var Entertainment = require('../models/entertainment')
var Review = require('../models/review')
var corporate = require('../models/corporate')
var reservationTime=require('../models/reservationTime')
var reservation=require('../models/reservation1');
module.exports = {
  //Checks if the user is authenticated before accessing any protected client routes
  checkAuthentication: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.session.client)
        return next()
    }
    res.status(401).send("You are unauthorized to access this page")
  },
  checkClientAuthentication: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.session.client)
        return res.json({success: " authenticated"})
    }
    else {
      return res.json({error: "Not authenticated"})
    }
    res.status(401).send("You are unauthorized to access this page")
  },
  //Handles client sign up with regular username, email and password
  localSignup: function(req, res, next) {
    //Use the passport authentication strategy in config/passport.js
    passport.authenticate('local-signup', function(err, user) {
      if (err) {
        res.json(err)
      }
      else if(user){
        //Log the user in via passport
        req.login(user, function(err) {
            if (err) {
              res.json({success: false, error: "An unexpected error has occured"})
            }
            else {
              //Identify this user as a client, and send the response with the newly created user
              req.session.client = true
              res.json({success: true, user: req.user})
            }
        })
      }
      else {
        res.json({success: false, error: "An unexpected error has occured"})
      }
    })(req, res, next)
  },
  //Handles client login with regular username and password
  localLogin: function(req, res, next) {
    //Uses the passport authentication strategy found in config/passport.js
    passport.authenticate('local-login', function(err, user) {
      if (err) {
        res.json(err)
      }
      else if(user) {
        //Log the user in using passport
        req.login(user, function(err) {
            if (err) {
              res.json({success: false, error: "An unexpected error has occured"})
            }
            else {
              //Identify this user as a client, and send a response with the retrieved user
              req.session.client = true
              res.json({success: true, user: req.user})
            }
        })

      }
      else {
        res.json({success: false, error: "Authentication failed"})
      }
    })(req, res, next)
  },
  //Logs the client in using the facebook passport auth strategy
  facebookLogin: function(req, res, next) {
    passport.authenticate('facebook', function(err, user) {
      if (err) {
        res.json(err)
      }
      else if(user) {
        //Login the user using passport
        req.login(user, function(err) {
          if (err) {
            res.json({success: false, error: "Authentication failed"})
          }
          else {
            res.json({success: true, user: req.user})
          }
        })
      }
      else {
        res.json({success: false, error: "An unexpected error has occured"})
      }
    })(req, res, next)
  },
  //Handles client logout
  logout: function(req, res, next) {
    //Logout the user using passport
    req.logout()
    //Destroy the session for extra measure
    req.session.destroy(function() {
        res.json({success: true})
    })
  },

  //Sends an email with a recovery token for a client to recover his password with, to the client's email address
  recoverPassword: function(req, res, next) {
    var email = req.body.email
    if (email) {
      //Find the client associated with the email given
      Client.findOne({email: email}, function(err, client) {
        if (err) {
          res.json({success: false, error: "An unexpected error has occured"})
        }
        else if(client) {
          //Generate a random recovery token
          var recoveryToken = crypto.randomBytes(32).toString('hex')
          //Prepare the email to be sent to the client containing the token
          var mail = {
            to: client.email,
            subject: "Password Recovery",
            html: "<h3>Use the following token to recover your account</h3><br><b>"+recoveryToken+"</b>",
          }
          //Send the email using the mailer module
          mailer.sendMail(mail, function(err, info) {
            if (err) {
              console.log(err)
              return res.json({success: false, error: "Failed to send recovery email to " + client.email})
            }
            //Save the generated recovery token, and send a successful response
            client.recoveryToken = recoveryToken
            client.save(function(err) {
              if (err) {
                return res.json({success: false, error: "An unexpected error has occured"})
              }
              res.json({success: true})
            })
          })
        }
        else {
          res.json({success: false, error: "No account found for username/email entered."})
        }
      })
    }
    else {
      res.json({success: false, error: "Incomplete information entered"})
    }
  },

  //allows the client to verify the recovery token,
  //To be prompted afterwards to enter his new password
  verifyRecoveryToken: function(req, res, next) {
    var email = req.body.email
    var token = req.body.token

    if (token) {
      //Find the client associated with the given email and recovery token
      Client.findOne({email: email, recoveryToken: token}, function(err, client) {
        if (err) {
          res.json({success: false, error: "An unexpected error has occured"})
        }
        else if (client) {
          res.json({success: true})
        }
        else {
          res.json({success: false, error: "Incorrect recovery token given"})
        }
      })
    }
    res.json({success: false, error: "Invalid token received"})
  },
  //Resets a client's password when given a correct combination of email/recoveryToken
  resetPassword: function(req, res, next) {
    var email = req.body.email
    var token = req.body.token
    var newPassword = req.body.password
    if (email && token && newPassword) {
      //Find the client associated with the given email and recovery token
      Client.findOne({email: email, recoveryToken: token}, function(err, client) {
        if (err) {
          return res.json({success: false, error: "An unexpected error has occured"})
        }
        if (client) {
            //Set the user's password to the newly entered pass
            client.local.hash = crypto.pbkdf2Sync(newPassword, client.local.salt, 1000, 64, 'sha512').toString('hex')
            client.recoveryToken = null
            client.save(function(err) {
              if (err) {
                return res.json({success: false, error: "An unexpected error has occured"})
              }
              res.json({success: true})
            })
        }
        else {
          res.json({success: false, error: "No account found for email/token given"})
        }

      })
    }
    else {
      res.json({success: false, error: "Invalid information received"})
    }

  },
  //Allows the client to post a review about an entertainment service
  postReview: function(req, res, next) {
    var serviceID = req.body.entertainment
    var text = req.body.text
    if (serviceID && text) {
      //Find the associated entertainment service
      Entertainment.findOne({_id: serviceID}, function(err, service) {
        if (err) {
          console.log(err)
          res.json({success: false, error: "An unexpected error occured while retrieving the entertainment service"})
        }
        else if(service){
          //Create a new review
          var review = new Review({_service: serviceID, _creator: req.user._id, text: text})
          review.save(function(err, review) {
            if (err) {
              return res.json({success: false, error: "Failed to add a new review"})
            }
            //Add it to the service's reviews array
            service.reviews.push(review)
            console.log(review);
            service.save(function(err) {
              if (err) {
                console.log(err)
                return res.json({success: false, error: "An unexpected error occured while saving the review"})
              }
              res.json({success: true, service : service})
            })
          })

        }
        else {
          res.json({success: false, error: "No entertainment service found matching given ID"})
        }
      })
    }
    else {
      res.json({success: false, error: "Invalid service ID/review text received"})
    }
  },
  //Allows the client to update his personal info
  editInfo: function(req, res, next) {
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var phone = req.body.phone
    var nationalID = req.body.nationalID
    if (firstName && lastName && phone && nationalID) {
      //Find the associated client
      Client.findById(req.user._id, function(err, client) {
        if (err) {
          console.log(err)
          res.json({success: false, error: "An unexpected error has occured"})
        }
        else if(client) {
          //Update the client's info and save it to the db
          client.firstName = firstName
          client.lastName = lastName
          client.phone = phone
          client.nationalID = nationalID
          client.save(function(err) {
            if (err) {
              res.json({success: false, error: "An unexpected error has occured"})
            }
            else {
              res.json({success: true, user: client})
            }
          })
        }
      })
    }
    else {
      res.json({success: false, error: "Incomplete information received"})
    }

  },
  rateService:function (req,res) {//rate entertainment
     Entertainment.findOne({_id:req.body.id},function (err,success) {
         if(err)
             console.log(err.message);
         else{
             if(success){
              var num=parseFloat(success.rating.length);
              success.rating.push(req.body.rating);
              num++;
              var i=0;
              var rating=0;
              for (i=0;i<num;i++){
                  rating=rating+success.rating[i];
              }
              rating=rating/parseFloat(num);
              success.actualRating=rating;
              success.save(function (err,ress) {
                 if(err)
                     console.log(err.message);
                 else{
                    // console.log(success.numberOfRatings);
                     Entertainment.findOne({_id:req.body.id},function (err,Entertainments) {
                         //res.render('rate',{Entertainments});
                         res.json({success:true,Entertainments:Entertainments});
                     })
                 }
               })
             }
         }

     })

   },
   getAllCorporates:function(req, res){
    corporate.find({Accepted:true} ,function(err, corporates){
          if(err)
            res.json({success: false, error: "enexpected error"}) //res.send(err.message);
          else
            res.json({success: true, corp: corporates});
      })
  },
  getCorporate: function(req, res){
    corporate.findOne({ _id: req.body._id} ,function(err, corporate){
      if(err)
        res.json({success: false, error: "unexpected error, corporate not found"}) //res.send(err.message);
      else
        res.json({success: true, corporate: corporate}); //render the view for client
    })
  },
  getCorporateServices:function(req,res){//get services of a specific Corporate
       Entertainment.find({email:req.body.email},function (req,Entertainments) {
           res.json({success:true,Entertainments:Entertainments});
       })
   },
	getService:function(req,res){
    Entertainment.findOne({_id:req.body.id},function(err,Entertainments){
      res.json({success:true,Entertainments:Entertainments});
    })
  },
  getAllServices:function(req, res){
      Entertainment.find({} ,function(err, Entertainments){
        if(err)
          res.json({success: false, error: "unexpected error"}) //res.send(err.message);
        else
          res.json({success: true, Entertainments: Entertainments});
        })
    },
    book:function(req,res){
      var RT=new reservationTime({date:req.body.date,startHour:req.body.startHour,startMinute:req.body.startMinute, booked:true});
      console.log(RT);
      var c=new Client();
      var service_price=req.body.price
      var balance=req.body.balance
      var time=new reservationTime();
      if(balance>service_price){
          var RT=new reservationTime({date:req.body.date,startHour:req.body.startHour,startMinute:req.body.startMinute, booked:true});
        var reservation1=new reservation({email:req.user.email,price:service_price,_id:req.body.Entid,name:req.body.name});
        reservation1.reservationTime=RT;
        reservation1.save();
        reservationTime.findOne({_id:req.body.reserveId},function (err,Res) {
          time=Res;
          console.log(Res)
          console.log(time)
          Res.booked=true;
          Res.save();

        })
        var newBalance=parseFloat(balance)-parseFloat(service_price);
        Client.findOne({email:req.user.email},function(err,Clients){
          Clients.balance=newBalance;
          c=Clients;
          Clients.save();
        })




          var etsh = new reservationTime();

        Entertainment.findOne({ _id: req.body.Entid}, function (err, service) {
            if (err)
              res.json({success: false, error: "Error occured while finding the services"})
            else{

              for (var i = 0; i < service.reservations.length; i++) {
                if(service.reservations[i]._id == req.body.reserveId){
                  etsh.date=service.reservations[i].date;
                  etsh.startHour=service.reservations[i].startHour;
                  etsh.startMinute=service.reservations[i].startMinute;
                  etsh.booked=true;
                  etsh._id=service.reservations[i]._id;
                  service.reservations.splice(i, 1);
                  break;
                }
              }

              service.save(function(err) {
                if (err) {
                  res.json({success: false, error: "An unexpected error has occuredzz"})
                }
                else {
                  console.log(service.reservations);
                  res.json({success: true, Entertainments: service})
                }
              })

            }
        })
        }
        else{
          res.json({success:22});
        }

      },

  view_reservations:function(req,res){
	reservation.find({email:req.user.email},function(err,ress){
	if(err){
	res.json({success:false, error:"No reservations for you"});
	}
	else{
	res.json({success:true,reservations:ress});
	}
	})
    }
}
