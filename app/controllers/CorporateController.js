var mongoose = require('mongoose')
var Corporate = require('../models/corporate')
var Review  = require('../models/review')
var crypto = require('crypto')
var passport = require('passport')
var multer = require('multer')
var Client = require('../models/client')
var Entertainment = require('../models/entertainment')
var admin = require('../models/admin')


//Define media storage directories
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var video_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/videos')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.m4v')
  }
})

var upload = multer({ storage: storage }).single('ProfileImage');
var video_upload = multer({ storage: video_storage }).single('ProfileVideo');




module.exports = {
  checkAuthentication: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.session.corporate)
        return next()
    }
    else {
      return res.json({error: "Not authenticated"})
    }
    res.status(401).send("You are unauthorized to access this page")

  },
  reportReview: function(req, res, next) {
    var reviewID = req.body.reviewID
      Review.findOne({_id: reviewID}, function(err, review) {
        if (err) {
          res.json({success: false, error: "An unexpected error occured while retrieving the review"})
        }
        else if(review) {
          review.reported = true
          review.save(function(err) {
            if (err) {
              res.json({success: false, error: "An unexpected error occured while updating the review"})
            }
            else {
              res.json({success: true})
            }
          })
        }
      })

  },
  SignUp: function (req, res) {
      var password = req.body.password;
      var default_pic = "/images/profile_client.png";
      var salt = crypto.randomBytes(16).toString('hex');
      var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      var corp = new Corporate();
          corp.name =  req.body.name;
          corp.local.email = req.body.email;
          corp.local.hash = hash;
          corp.local.salt =  salt;
          corp.phone = req.body.phone;
          corp.address = req.body.address;
          corp.type =  req.body.type;
          corp.profileimage =default_pic;
          corp.request = true;
          corp.Accepted = false;
      corp.save(function (err, corp) {
          if (err) {
              console.log(err);
              res.json({success: false, error: "An unexpected error has occured1"})
          } else {
              res.json({success: true, user: req.corp})
          }

      })
  },
  localSignUp: function(req, res,next) {
          passport.authenticate('corporate-signup', function(err, user) {
              if (err) {
                  res.json(err)
              }
              else if(user){
                  req.login(user, function(err) {
                      if (err) {
                          console.log(err);
                          res.json({success: false, error: "An unexpected error has occured1"})
                      }
                      else {
                          req.session.corporate = true
                          res.json({success: true, user: req.user})
                      }
                  })
              }
              else {
                  res.json({success: false, error: "An unexpected error has occured2"})
              }
          })(req, res, next)
      },
  localLogin: function(req, res,next) {
      passport.authenticate('corporate-login', function(err, user) {
          if (err) {
              res.json(err)
          }
          else if(user) {
              req.login(user, function(err) {
                  if (err) {
                      console.log(err);
                      res.json({success: false, error: "An unexpected error has occured"})
                  }
                  else {
                      req.session.corporate = true
                      //console.log("Corporate Auth" + req.isAuthenticated())
                      res.json({success: true, user: req.user})
                  }
              })

          }
          else {
              res.json({success: false, error: "Authentication failed"})
          }
      })(req, res, next)
  },
  logout: function(req, res, next) {
    req.logout()
    req.session.destroy(function() {
        res.json({success: true})
    })
  },
    // Media Adding to corporate's Entertainment
    addMedia:function(req, res){
     upload(req, res, function (err) {
       Entertainment.findOne({"email": req.user.local.email, _id:req.body.id}, function(err, entertainment){
         if(err){
             res.send(err.message);
             res.json({success: false, error: "Error occured while finding the services"})
         }else {
           var uploaded = false;
           var loggedin = true;
           if (err) {
             // An error occurred when uploading
             console.log('Error while Uploading media.')
             res.json({
               success: false,
               message: 'Uploading failed'
             })
            //  return res.end("Error uploading file.");
           }
          //  var result =  req.file.path;
          //  console.log(result)

          var new_image = req.file.filename;
          var file = '/uploads/images/' + req.file.filename;
            //  console.log(__dirname+'/../')
            //  console.log(file)

          uploaded = true;
          console.log(req.user.local.email)
          console.log(req.body.id)
          console.log(entertainment)
          console.log("Debugg")
          // Pushing Image Name String
          entertainment.images.push(new_image)
          //Saving the new image to Corporate
          entertainment.save()
          //  console.log(req.file);
          //Checking Using Postman..
          res.json({
            success: true,
            message: 'Image Uploaded',
            id: req.body.id,
            image: new_image
          })
            //  res.render('media', {loggedin,uploaded,corp});



         }
   })


     })

   },


   addVideo:function(req, res){
      video_upload(req, res, function (err) {
        Entertainment.findOne({"email": req.user.local.email, _id:req.body.id}, function(err, entertainment){
          if(err){
              res.send(err.message);
              var loggedin = false;
              res.render('login',loggedin);
          }else {
            var uploaded = false;
            var loggedin = true;
            if (err) {
              // An error occurred when uploading
              console.log('Error while Uploading media.')
              return res.end("Error uploading file.");
            }
            console.log('Uploaded Video Successfully .')
           //  var result =  req.file.path;
           //  console.log(result)
           var new_video = req.file.filename;
            var file = '/uploads/videos/' + req.file.filename;
            console.log(__dirname+'/../')
            console.log(file)

            uploaded = true;
            // Pushing Video Name String
            entertainment.videos.push(new_video)
            //Saving the new Video to Corporate
            entertainment.save()
           //  console.log(req.file);

            //Checking Using Postman..
            res.json({
              success: true,
              message: 'Video Uploaded',
              id: req.body.id,
              video: new_video
            })
            // res.render('media', {loggedin,uploaded,corp});
          }
        })


      })

    },

    getAnnouncments:function(req, res){
      Corporate.findOne({"local.email": req.user.local.email}, function(err, corp){
        if(err || corp == null){
            // res.send(err);
            res.end('No corporate is loggedin !')
            // console.log('Henna')
        } else {
          console.log('Reach Announcments of this corporate Successfully.')
          res.json({
            success: true,
            announcements: corp.announcments
          })
          // res.render('announcments', {corp});
        }

    })


  },

    newAnnouncment: function(req, res){
      Corporate.findOne({"local.email": req.user.local.email}, function(err, corp){
        if(err || corp == null){
            res.end('No corporate is loggedin !')
        } else {
          console.log('new Announcments of this corporate is valid.')
          var data = req.body.userinput;
          var test_time = new Date()
          var time_result = test_time.toLocaleDateString()
          corp.announcments.data.push(data);
          corp.announcments.time.push(time_result);
          corp.save()
          console.log('Announcments added.')
          console.log(data)
          console.log(time_result)
          res.json({
            success: true,
            message: 'New Announcment Created!',
            user:corp
          })
        }

      })


  },
  addService: function (req, res) { //1-add new Entertainment(Email is got from the session or passport)
        let entertainment = new Entertainment(req.body);
        entertainment.email = req.user.local.email;
        entertainment.save(function (err, register) {
            if (err) {
                console.log(err);
                res.send(err.message);
            } else {

                Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
                    if (err)
                      res.json({success: false, error: "Error occured while finding the service"})
                    else
                      res.json({success: true, Entertainments: Entertainments});
                })
            }
        })

    },
    getCorporationServices: function (req, res) {  //3- Get all the entertainment services related to some Corporate using his email(foreign key)
        Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
            if (err)
              res.json({success: false, error: "Error occured while finding the services"})
            else
              res.json({success: true, Entertainments: Entertainments});
        })
    },
    getService: function (req, res) { //4-get the entertainment page(either further details,remove,edit info)
        Entertainment.findOne({_id: req.body.id}, function (req, Entertainments) {
            res.json({success: true, Entertainments: Entertainments});

        })
    },
    removeService: function (req, res) {//remove some entertainment service
        //  console.log(req.body.name);
        Entertainment.findOne({_id: req.body.id}, function (err, found) {
            if (err)
                res.json({success: false, error: "Error occured while finding the service"})
            else {
                if (found) {
                    console.log("found");
                    Entertainment.remove({_id: req.body.id}, function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
                                if (err) {
                                    res.json({success: false, error: "Error"})
                                }
                                else
                                    res.json({success: true, Entertainments: Entertainments});
                            })
                        }
                    })
                }
                else {
                    res.json({success: false, error: "Failed to find service"})
                }
            }
        })
    },

    editService: function(req, res, next) {
      var phone = req.body.phone;
      var price = req.body.price;
      var location = req.body.location;
      var name = req.body.name;
      if (name && price && location && phone) {
        //Find the associated client
        Entertainment.findOne({_id:req.body.id}, function(err, service) {
          if (err) {
            console.log(err)
            res.json({success: false, error: "An unexpected error has occured"})
          }
          else if(service) {
            //Update the client's info and save it to the db
            service.name = name
            service.location = location
            service.phone = phone
            service.price = price
            service.save(function(err) {
              if (err) {
                res.json({success: false, error: "An unexpected error has occuredzz"})
              }
              else {
                res.json({success: true, Entertainments: service})
              }
            })
          }
        })
      }
      else {
        res.json({success: false, error: "Incomplete information received"})
      }

    },


}
