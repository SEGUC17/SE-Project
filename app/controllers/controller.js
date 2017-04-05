let corporate = require('../models/corporate');
var crypto = require('crypto');
var passport = require('passport');
let controller = {
    SignUp: function (req, res) {
        var password = req.body.password;
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        var corp = new corporate();
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
    /*login: function (req, res) {
        corporate.findOne({email: req.body.email}, function (err, corp) {
            if (err) {
                res.send(err.message);
                var loggedin = false;
                res.render('login', loggedin);
            } else {
                if (corp) {
                    var salt = corp.salt;
                    console.log(salt);
                    var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
                    if (hash === corp.hash) {
                        var loggedin = true;
                        var registered = false;
                        res.render('login', {loggedin, registered});
                    } else {
                        var loggedin = false;
                        var registered = false
                        res.render('login', {loggedin, registered});
                    }
                } else {
                    var loggedin = false;
                    var registered = false;
                    res.render('login', {loggedin, registered});
                }
            }
        })

    },*/

    requests: function (req, res) {
        corporate.find({request: true}, function (err, corp) {
            if (corp) {
                res.render('requests', {corp});
            }else{
                console.log("no");
            }
        });

    },
    accept:function(req,res){
        var e = req.params.cem.substring(1);
        corporate.findOne({email:e},function(err,corp){
            if(corp) {
                corp.Accepted = true;
                corp.request=false;
                corp.save(function(err,corp){
                    if (err) {
                        console.log(err);
                    }else {
                        res.redirect('/');
                    }
                })
            }
        })
    },
    reject:function(req,res){
        var e = req.params.cem.substring(1);
        corporate.findOne({email:e},function(err,corp){
            if(corp) {
                corp.Accepted = false;
                corp.request=false;
                corp.save(function(err,corp){
                    if (err) {
                        console.log(err);
                    }else {
                        res.redirect('/');
                    }
                })

            }
        })
    },
    localSignUp: function(req, res,next) {
            passport.authenticate('local-signup', function(err, user) {
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
        passport.authenticate('local-login', function(err, user) {
            if (err) {
                res.json(err)
            }
            else if(user) {
                req.logIn(user, function(err) {
                    if (err) {
                        console.log(err);
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
    }

}

module.exports = controller;
