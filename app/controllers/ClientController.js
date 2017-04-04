var passport = require('passport');
var mailer = require('./MailController')
var crypto = require('crypto')
var Client = require('../models/client')

module.exports = {
  localSignup: function(req, res, next) {
    passport.authenticate('local-signup', function(err, user) {
      if (err) {
        res.json(err)
      }
      else if(user){
        req.login(user, function(err) {
            if (err) {
              res.json({success: false, error: "An unexpected error has occured"})
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
  localLogin: function(req, res, next) {
    passport.authenticate('local-login', function(err, user) {
      if (err) {
        res.json(err)
      }
      else if(user) {
        req.login(user, function(err) {
            if (err) {
              res.json({success: false, error: "An unexpected error has occured"})
            }
            else {
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
  logout: function(req, res, next) {
    req.logout()
    req.session.destroy(function() {
        res.json({success: true})
    })
  },

  //Sends an email with a recovery token for a client to recover his password with, to the client's email address
  recoverPassword: function(req, res, next) {
    var email = req.body.email
    if (email) {
      Client.findOne({email: email}, function(err, client) {
        if (err) {
          res.json({success: false, error: "An unexpected error has occured"})
        }
        else if(client) {
          var recoveryToken = crypto.randomBytes(32).toString('hex')
          var mail = {
            to: client.email,
            subject: "Password Recovery",
            html: "<h3>Use the following token to recover your account</h3><br><b>"+recoveryToken+"</b>",
          }
          mailer.sendMail(mail, function(err, info) {
            if (err) {
              console.log(err)
              return res.json({success: false, error: "Failed to send recovery email to " + client.email})
            }
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
      Client.findOne({email: email, recoveryToken: token}, function(err, client) {
        if (err) {
          return res.json({success: false, error: "An unexpected error has occured"})
        }
        if (client) {
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
      res.json({success: false, error: "Incomplete information entered"})
    }

  }
}
