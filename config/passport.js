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
        firstField: 'firstName',
        lastField:'lastName',
        usernameField: 'username',
        passwordField:'password',
        emailField: 'email',
        nationalIDField: 'nationalID',
        phoneField:'phone',

        passReqToCallback: true

    },
  function (req,res,username,password,done) {
      process.nextTick(function () {
          Client.findOne({'username': username}, function(err,client){

              if(err)
                  return next(err);
              if(client){
                  return next(null,false,res.console.log("email exists"))
              }
              else{
                  var newClient = new Client();
                  newClient.local.firstName = firstName;
                  newClient.local.lastName =  lastName;
                  newClient.local.phone = phone;
                  newClient.local.email = email;
                  salt = crypto.randomBytes(16).toString('hex');
                  newClient.local.salt = salt;
                  newClient.local.hash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
                  newClient.save(function (err) {
                      if(err)
                          throw err;
                      return done(null,newClient);

                  });
                   }
      });
  });

}));


    //Startegy for local Log IN

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallBack: true
    },
    function (req,res,username,password,done)
    { Client.findOne({'local.username': username},function(err,client) {
        if(err)
            return done(err);
        if(!client)
            return done(null,false,res.console.log("No user found bro"));
        if(!client.validPassword(password))
        return done(null,false,res.console.log("wrong password"));
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
          next(err);
        }
        //Client exists, hand it to the next callback
        if (client) {
          next(null, client);
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
                console.log(err);
                next(err)
              }
              return next(null, newClient)
          })
        }
      })
    })
  );

};