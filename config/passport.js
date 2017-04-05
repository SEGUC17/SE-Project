var LocalStrategy = require('passport-local').Strategy;
const crypto = require("crypto");
const passport = require("passport");
var corporate = require("../app/models/corporate");

module.exports = function(passport) {
    passport.serializeUser(function (user, next) {
        next(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, next) {
        Client.findById(id, function (err, user) {
            next(err, user);
        });
    });

    passport.use('local-signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
        function(req,email,password,next){
            process.netTick(function(){
                corporate.findOne({$or:[{'local.email':req.body.email},{"name":req.body.name}]},function(err,corp){
                    if(err){
                        console.log(err);
                    }
                    if(corp){
                        next({success:false,error:"This name already exists!"})
                    }else{
                        var salt = crypto.randomBytes(16).toString('hex');
                        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
                        var corporate = new corporate();
                            corporate.name = req.body.name;
                            corporate.local.email = req.body.email;
                            corporate.phone = req.body.phone;
                            corporate.address = req.body.address;
                            corporate.type = req.body.type;
                            corporate.request = true;
                            corporate.Accepted = false;
                            corporate.local.salt = salt;
                            corporate.local.hash = hash;
                            corporate.save(function(err){
                                if(err) {
                                    console.log(err)
                                    next({success: false, error: 'An unexpected error has occured'})
                                }

                                return next(null, client);
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
        function (req,username,password,next){
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