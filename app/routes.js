var express = require('express');
var router = express.Router();
var clientController = require('./controllers/ClientController')
var corporateController = require('./controllers/CorporateController')
var adminController = require('./controllers/AdminController')
var passport = require('passport')

//Client & Visitor routes
router.post('/client/login/facebook', clientController.facebookLogin);

router.post('/client/login/facebook/cb', clientController.facebookLogin);

router.post('/client/signup', clientController.localSignup)

router.post('/client/login', clientController.localLogin);

router.post('/client/logout', clientController.logout)

router.post('/client/recover', clientController.recoverPassword)

router.post('/client/verifyToken', clientController.verifyRecoveryToken)

router.post('/client/reset', clientController.resetPassword)

router.post('/client/corporates', clientController.getAllCorporates)

router.post('/client/corporate', clientController.getCorporate)

router.post('/client/service', clientController.getService)

router.post('/client/services', clientController.getAllServices)

//Client only Routes
router.post('/client/review', clientController.checkAuthentication, clientController.postReview)

router.post('/client/edit', clientController.checkAuthentication, clientController.editInfo)

router.post('/client/service/rate', clientController.checkAuthentication, clientController.rateService)


//Administrator Routes
router.post('/admin/login', adminController.login)

router.post('/admin/requests', adminController.checkAuthentication, adminController.getNewCorporateRequests);

router.post('/admin/accept/:cem', adminController.checkAuthentication, adminController.acceptCorporate);

router.post('/admin/reject/:cem', adminController.checkAuthentication, adminController.rejectCorporate);

router.post('/admin/service/remove', adminController.checkAuthentication, adminController.removeService);

router.post('/admin/service', adminController.checkAuthentication, adminController.getAllServices);

router.post('/admin/corporate/services', adminController.checkAuthentication, adminController.getCorporateServices)

router.post('/admin/clients', adminController.checkAuthentication, adminController.getAllClients

//Corporate Routes

router.post('/corporate/signup', corporateController.localSignUp);

router.post('/corporate/login', corporateController.localLogin);

router.post('/corporate/reportReview', corporateController.checkAuthentication, corporateController.reportReview)

router.post('/corporate/logout', corporateController.logout)

router.post('/corporate/addMedia/file',corporateController.addMedia);

router.post('/corporate/addVideo/file',corporateController.addVideo);

router.post('/corporate/announcments', corporateController.getAnnouncments);

router.post('/corporate/new/announcment', corporateController.newAnnouncment);

router.post('/corporate/service/add', corporateController.addService);

router.post('/corporate/service/remove',corporateController.removeService);

router.post('/corporate/service/price', corporateController.editServicePrice);

router.post('/corporate/service/phone', corporateController.editServicePhone);

router.post('/corporate/service/location', corporateController.editServiceLocation);

router.post('/corporate/service/name',corporateController.editServiceName);

router.post('/corporate/services', corporateController.getCorporationServices);

router.post('/corporate/service', corporateController.getService);


//export router

module.exports = router;
