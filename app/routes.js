var express = require('express');
var router = express.Router();
var controller = require('./controllers/controller');


router.get('/',controller.requests);
router.get('/home',function(req,res){
    var registered = false;
    var loggedin = false;
    res.render('login',{registered,loggedin});
});
router.post('/Signup',controller.SignUp);
router.post('/login',controller.login);
router.get('/register',function(req,res){
    var registered = false;
    res.render('register',{registered});
});
router.get('/logout',function(req,res){
    var registered = false;
    var loggedin = false;
    res.render('login',{registered,loggedin});
});
router.get('/accept/:cem',controller.accept);
router.get('/reject/:cem',controller.reject);
module.exports = router;