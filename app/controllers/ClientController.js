var passport = require('passport');
var mailer = require('./MailController')
module.exports = {
  localSignup: function(req, res, next) {
    passport.authenticate('local-signup', function(err, user) {
      console.log("Hi---------------")
      console.log(err)
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
  }
}
