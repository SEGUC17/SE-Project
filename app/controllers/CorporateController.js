<<<<<<< HEAD
var mongoose = require('mongoose')
var Corporate = require('../models/corporate')
var Review  = require('../models/review')
var crypto = require('crypto')
var passport = require('passport')

var crypto = require('crypto');

var email_session = "";


//Files Uploader...
var multer = require('multer');
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
    if (reviewID) {
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
    }
    return res.json({success: false, error: "Invalid review ID received"})
  },
  SignUp: function (req, res) {
      var password = req.body.password;
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
  requests: function (req, res) {
      Corporate.find({request: true}, function (err, corp) {
          if (corp) {
              res.render('requests', {corp});
          }else{
              console.log("no");
          }
      });

  },
  accept:function(req,res){
      var e = req.params.cem.substring(1);
      Corporate.findOne({'local.email':e},function(err,corp){
          if(corp) {
              corp.Accepted = true;
              corp.request=false;
              corp.save(function(err,corp){
                  if (err) {
                      console.log(err)
                      res.json({success: false, error: "An unexpected error occured while updating the corporation"})
                  }else {
                      res.json({success: true})
                  }
              })
          }
      })
  },
  reject:function(req,res){
      var e = req.params.cem.substring(1);
      Corporate.findOne({'local.email':e},function(err,corp){
          if(corp) {
              corp.Accepted = false;
              corp.request=false;
              corp.save(function(err,corp){
                  if (err) {
                      console.log(err);
                      res.json({success: false, error: "An unexpected error occured while updating the corporation"})
                  }else {
                      res.json({success: true})
                  }
              })

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



      // Media Adding to corporate
      addMedia:function(req, res){
       upload(req, res, function (err) {
         Corporate.findOne({email: email_session}, function(err, corp){
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
               res.json[{
                 success: false,
                 message: 'Uploading failed'
               }]
              //  return res.end("Error uploading file.");
             }
             console.log('Uploaded Image Successfully .')
            //  var result =  req.file.path;
            //  console.log(result)
            var new_image = req.file.filename;
             var file = '/uploads/images/' + req.file.filename;
             console.log(__dirname+'/../')
             console.log(file)

             uploaded = true;
             // Pushing Image Name String
             corp.images.push(new_image)
             //Saving the new image to Corporate
             corp.save()
            //  console.log(req.file);

             //Checking Using Postman..
             res.json[{
               success: true,
               message: 'Image Uploaded'
             }]
            //  res.render('media', {loggedin,uploaded,corp});
           }
         })


       })

     },


     addVideo:function(req, res){
      video_upload(req, res, function (err) {
        Corporate.findOne({email: email_session}, function(err, corp){
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
            corp.videos.push(new_video)
            //Saving the new Video to Corporate
            corp.save()
           //  console.log(req.file);

            //Checking Using Postman..
            res.json[{
              success: true,
              message: 'Video Uploaded'
            }]
            // res.render('media', {loggedin,uploaded,corp});
          }
        })


      })

    },

    getAnnouncments:function(req, res){
      Corporate.findOne({email: email_session}, function(err, corp){
        if(err || corp == null){
            // res.send(err);
            res.end('No corporate is loggedin !')
            // console.log('Henna')
        } else {
          console.log('Reach Announcments of this corporate Successfully.')
          res.json[{
            success: true,
            message: 'Announcments Viewed Successfully'
          }]
          // res.render('announcments', {corp});
        }

    })


  },

    newAnnouncment: function(req, res){
      Corporate.findOne({email: email_session}, function(err, corp){
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
          res.json[{
            success: true,
            message: 'New Announcment Created!'
          }]
          // res.render('announcments',{corp})
        }

      })


  }

}
