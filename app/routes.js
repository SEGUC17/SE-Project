var express = require('express');
var router = express.Router();
var controller = require('./controllers/CorporateController');

// Media controllers
router.post('/addMedia/file',controller.addMedia);
router.post('/addVideo/file',controller.addVideo);
//

// Announcments Routing
router.get('/announcments',controller.getAnnouncments);
router.post('/new/announcment',controller.newAnnouncment);

//

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
