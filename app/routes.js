var express = require('express');
var router = express.Router();
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
