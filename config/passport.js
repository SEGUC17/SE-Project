var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require("crypto");
var Client = require("../app/models/client");
const passport = require("passport");

module.exports = function(passport) {
  passport.serializeUser(function(user, next) {
      next(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, next) {
      Client.findById(id, function(err, user) {
          next(err, user);
      });
  });

  //Local User strategy to sign up
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField:'password',
        passReqToCallback: true
    },
    function (req,username,password,next) {
        process.nextTick(function () {
            var firstName = req.body.firstName
            var lastName = req.body.lastName
            var phone = req.body.phone
            var email = req.body.email
            if (firstName && lastName && phone && email) {
              Client.findOne({$or:[{"username":username}, {"email":email}]}, function(err, user){
                if (err) {
                  console.log(err)
                  next({success: false, error: "An unexpected error has occured"})
                }
                if (user) {
                  next({success: false, error: "This username already exists!"})
                }
                else {
                  var client = new Client();
                  client.firstName = firstName
                  client.lastName = lastName
                  client.email = email
                  client.phone = phone
                  client.local.username = username
                  client.local.salt = crypto.randomBytes(16).toString('hex')
                  client.local.hash = crypto.pbkdf2Sync(password, client.local.salt, 1000, 64, 'sha512').toString('hex')
                  console.log("Hey")
                  client.save(function(err) {
                    if(err) {
                      console.log(err)
                      next({success: false, error: 'An unexpected error has occured'})
                    }

                    return next(null, client)
                  })
                }
              })
            }
            else {
              next({success: false, error: "Incomplete information entered"})
            }
        });

    }));

    //Startegy for local Log IN

    passport.use('local-login', new LocalStrategy({
          usernameField: 'username',
          passwordField: 'password',
      },
      function (username,password,next){
          Client.findOne({'local.username': username},function(err,client) {
            if(err){
                console.log(err)
                next({success: false, error: "An unexpected error has occured"});
            }
            if (client) {
              if (client.validPassword(password)) {
                return next(null, client)
              }
              else {
                return next({success: false, error: "Incorrect username/password combination entered"})
              }
            }
            else {
              return next({success: false, error: "No account exists for the entered username"})
            }
        });

    }));


  //Facebook strategy to authenticate with facebook
  passport.use(new FacebookStrategy( {
      clientID: 271754079904118,
      clientSecret: '05c2cb6700326d75f9c54b8829340cfc',
      callbackURL: 'http://localhost:8080/client/login/facebook/cb',
      profileFields: ['id', 'name', 'emails']
    },
    function(token, refreshToken, profile, next) {
      Client.findOne({'facebook.id': profile.id},
      function(err, client) {
        if (err) {
          console.log(err)
          next({success: false, error: "An unexpected error has occured"})
        }
        //Client exists, hand it to the next callback
        if (client) {
          return next(null, client);
        }
        else {
          //Create a new client with the provided info from facebook
          var newClient = new Client();
          newClient.facebook.id = profile.id;
          newClient.facebook.token = token;
          newClient.firstName = profile.name.givenName;
          newClient.lastName = profile.name.familyName;
          newClient.email = profile.emails[0].value;
          newClient.save(function(err) {
              if (err) {
                console.log(err)
                return next({success: false, error: "An unexpected error has occured"})
              }
              return next(null, newClient)
          })
        }
      })
    })
  );

};
