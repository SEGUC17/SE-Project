var LocalStrategy = require('passport-local').Strategy;
const crypto = require("crypto");
const passport = require("passport");
let corporate = require("../app/models/corporate");

module.exports = function(passport) {
    passport.serializeUser(function (user, next) {
        next(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, next) {
        corporate.findById(id, function (err, user) {
            next(err, user);
        });
    });

    passport.use('local-signup',new LocalStrategy({
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
                        corp.local.salt = salt;
                        corp.local.hash = hash;
                        corp.save(function(err){
                                if(err) {
                                    console.log(err);
                                    next({success: false, error: 'An unexpected error has occured'})
                                }

                                return next(null, corp);
                            })

                    }
                })
            });
        }

    ));
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email,password,next){
        corporate.findOne({'local.email': email},function(err,corp){
            if(err){
                console.log(err);

            }
            if(corp){
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