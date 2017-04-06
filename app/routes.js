var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var clientController = require('./controllers/ClientController')
var corporateController = require('./controllers/CorporateController')
var passport = require('passport')

//Client Routes
router.get('/client/login/facebook', clientController.facebookLogin);

router.get('/client/login/facebook/cb', clientController.facebookLogin);

router.post('/client/signup', clientController.localSignup)

router.post('/client/login', clientController.localLogin);

router.post('/client/logout', clientController.logout)

router.post('/client/recover', clientController.recoverPassword)
=======
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
>>>>>>> roshdy

router.post('/client/verifyToken', clientController.verifyRecoveryToken)

router.post('/client/reset', clientController.resetPassword)

router.post('/client/review', clientController.checkAuthentication, clientController.postReview)

router.post('/client/edit', clientController.checkAuthentication, clientController.editInfo)

//Corporate Routes

router.post('/corporate/signup',corporateController.localSignUp);

router.post('/corporate/login',corporateController.localLogin);

router.post('/corporate/accept/:cem', corporateController.accept);

router.post('/corporate/reject/:cem', corporateController.reject);

router.post('/corporate/reportReview', corporateController.checkAuthentication, corporateController.reportReview)

router.post('/corporate/logout', corporateController.logout)

module.exports = router;
