let corporate = require('../models/corporate');
var crypto = require('crypto');
var passport = require('passport');
let controller = {
    /*SignUp: function (req, res) {
        var password = req.body.password;
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        let corp = new corporate({
            name: req.body.name,
            email: req.body.email,
            hash: hash,
            salt: salt,
            phone: req.body.phone,
            address: req.body.address,
            type: req.body.type,
            request: true,
            Accepted: false
        });
        corp.save(function (err, corp) {
            if (err) {
                var registered = false;
                res.render('register', {registered});
            } else {
                var registered = true;
                var loggedin = false
                res.render('login', {registered, loggedin});
            }

        })
    },
    login: function (req, res) {
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
        localSignup: function(req, res) {
            passport.authenticate('local-signup', function(err, user) {
                successRedirect : '/profile';
                failureRedirect : '/Signup';
                failureFlash :true;
            })(req, res, next)
        },
    localLogin: function(req, res) {
        passport.authenticate('local-login', function(err, user) {
            successRedirect : '/profile';
            failureRedirect : '/login';
            failureFlash :true;

        })(req, res, next)
    }

}

module.exports = controller;
