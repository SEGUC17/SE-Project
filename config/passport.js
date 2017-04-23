var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require("crypto");
var Client = require("../app/models/client");
const passport = require("passport");
let corporate = require("../app/models/corporate")

module.exports = function(passport) {
  passport.serializeUser(function(user, next) {
      next(null, {id: user.id, corporate: user.name?true:false});
  });
  // used to deserialize the user
  passport.deserializeUser(function(user, next) {
      if (user.corporate) {
        corporate.findById(user.id, function(err, corporate) {
          next(err, corporate);
        })
      }
      else {
        Client.findById(user.id, function(err, client) {
            next(err, client);
        });
      }
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
            var nationalID = req.body.nationalID
            if (firstName && lastName && phone && email) {
              //Find clients with the given username or email
              Client.findOne({$or:[{"username":username}, {"email":email}]}, function(err, user){
                if (err) {
                  console.log(err)
                  next({success: false, error: "An unexpected error has occured"})
                }
                if (user) {
                  next({success: false, error: "This username already exists!"})
                }
                else {
                  //Create a new client with the given info
                  var client = new Client();
                  client.firstName = firstName
                  client.lastName = lastName
                  client.email = email
                  client.phone = phone
                  client.nationalID = nationalID
                  client.local.username = username
                  //Generate a salt and use it to hash the password
                  client.local.salt = crypto.randomBytes(16).toString('hex')
                  client.local.hash = crypto.pbkdf2Sync(password, client.local.salt, 1000, 64, 'sha512').toString('hex')
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
              //Validate that the entered password matches the stored one
              if (client.validPassword(client.local.salt, password, client.local.hash)) {
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

  passport.use('corporate-signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
        },
        function(req,email,password,next){
            process.nextTick(function(){
                corporate.findOne({ 'local.email' :  email }, function(err, corp) {
                    if(err){
                        console.log(err);
                    }
                    if(corp){
                        next({success:false,error:"This name already exists!"})
                    }else{
                        console.log("alreadyhere");
                        var default_pic = "/images/profile_client.png";
                        var salt = crypto.randomBytes(16).toString('hex');
                        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
                        var corp = new corporate();
                        corp.name = req.body.name;
                        corp.local.email = email;
                        corp.phone = req.body.phone;
                        corp.address = req.body.address;
                        corp.type = req.body.type;
                        corp.request = true;
                        corp.Accepted = false;
                        corp.profileimage =default_pic;
                        corp.local.salt = salt;
                        corp.local.hash = hash;
                        corp.save(function(err){
                                if(err) {
                                    console.log(err);
                                    return next({success: false, error: 'An unexpected error has occured'})
                                }
                                return next(null, corp);
                            })

                    }
                })
            });
        }

    ));
    passport.use('corporate-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email,password,next){
        //Find the corporate account with the given email
        corporate.findOne({'local.email': email},function(err,corp){
            if(err){
                console.log(err);
            }
            if(corp){
              if(corp.Accepted==false){
                var c=1;
                return next({success:false,error:c})
              }
                //Validate that the entered password matches the stored one
                if(corp.validPassword(corp.local.salt,password,corp.local.hash)){
                    return next(null,corp)
                }else{
                    return next({success:false,error:"incorrect email or password"})
                }
            }else{
                return next({success:false,error:"This account does not exist"})
            }

        })

        }));

};
