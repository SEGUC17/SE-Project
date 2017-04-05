var mongoose = require('mongoose')
var Corporate = require('../models/corporate')
var Review  = require('../models/review')
var crypto = require('crypto')
var passport = require('passport')

module.exports = {
  checkAuthentication: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.session.corporate)
        return next()
    }
    else {
      return res.json({error: "Not authenticated", user: req.user})
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
                      console.log("Corporate Auth" + req.isAuthenticated())
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
}
