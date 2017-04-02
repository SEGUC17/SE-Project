var express = require('express');
var router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
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

module.exports = router;
=======
=======
>>>>>>> b61b193b222f63af367c24e831fca155e34ce1cf








module.exports = router;
<<<<<<< HEAD
>>>>>>> 3ee328bc421657f5a809cda0d3b278c0341a2519
=======
>>>>>>> b61b193b222f63af367c24e831fca155e34ce1cf
