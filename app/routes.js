var express = require('express');
var router = express.Router();
var clientController = require('./controllers/ClientController')
var corporateController = require('./controllers/CorporateController')
var adminController = require('./controllers/AdminController')
var searchController = require('./controllers/SearchController')
var rootController = require('./controllers/rootController')
var passport = require('passport')
var bodyParser = require('body-parser');
var multer = require('multer')
var fs = require('fs');
var stripeController=require('./controllers/stripeController')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})


let video_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/videos')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})

var upload = multer({ storage: storage })
var upload_video = multer({ storage: video_storage });
//Get index page
router.get('*',rootController.a);

//Client & Visitor routes
router.post('/client/login/facebook', clientController.facebookLogin);

router.post('/client/login/facebook/cb', clientController.facebookLogin);

router.post('/client/signup', clientController.localSignup)

router.post('/client/checkAuthentication', clientController.checkClientAuthentication)

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

router.post('/view_reservations', clientController.checkAuthentication,clientController.view_reservations);

//Administrator Routes
router.post('/admin/login', adminController.login)

router.post('/admin/check', adminController.checkAdminAuthentication)

router.post('/admin/requests', adminController.checkAuthentication, adminController.getNewCorporateRequests);

router.post('/admin/accept', adminController.checkAuthentication, adminController.acceptCorporate);

router.post('/admin/reject', adminController.checkAuthentication, adminController.rejectCorporate);

router.post('/admin/service/remove', adminController.checkAuthentication, adminController.removeService);

router.post('/admin/service', adminController.checkAuthentication, clientController.getService);

router.post('/admin/services', adminController.checkAuthentication, adminController.getAllServices);

router.post('/admin/corporate/services', adminController.checkAuthentication, adminController.getCorporateServices)

router.post('/admin/clients', adminController.checkAuthentication, adminController.getAllClients)

router.post('/admin/remove', adminController.checkAuthentication, adminController.removeClient)

router.post('/admin/reviews', adminController.checkAuthentication, adminController.getReportedReviews)

router.post('/admin/review/remove', adminController.checkAuthentication, adminController.removeReview)

//Corporate Routes

router.post('/corporate/checkAuthentication', corporateController.checkCorpAuthentication)

router.post('/corporate/signup', corporateController.localSignUp);

router.post('/corporate/login', corporateController.localLogin);

router.post('/corporate/reportReview', corporateController.checkAuthentication, corporateController.reportReview)

router.post('/corporate/logout', corporateController.logout)

router.post('/corporate/addimage/file', upload.single('file'), corporateController.addProfilePic);

router.post('/corporate/addMedia/file', upload.single('file'), corporateController.addMedia);

router.post('/corporate/addVideo/file', upload_video.single('file'), corporateController.addVideo);

router.post('/corporate/announcments', corporateController.checkAuthentication, corporateController.getAnnouncments);

router.post('/corporate/new/announcment', corporateController.checkAuthentication, corporateController.newAnnouncment);

router.post('/corporate/service/add', corporateController.addService);

router.post('/corporate/service/remove',corporateController.removeService);

// router.post('/corporate/service/price', corporateController.editServicePrice);
//
// router.post('/corporate/service/phone', corporateController.editServicePhone);
//
// router.post('/corporate/service/location', corporateController.editServiceLocation);
//
// router.post('/corporate/service/name',corporateController.editServiceName);

router.post('/corporate/service/edit',corporateController.editService);

router.post('/corporate/services', corporateController.getCorporationServices);

router.post('/corporate/service', corporateController.getService);

//Search router
router.post('/search', searchController.search)

router.post('/charge',clientController.checkAuthentication,stripeController.charge)

router.post('/book',clientController.checkAuthentication,clientController.book)

router.post('/corporate/service/timing', corporateController.checkAuthentication, corporateController.addReservation);



//export router

module.exports = router;
