var express = require('express');
var router = express.Router();
var EntertainmentController = require('./controllers/EntertainmentController');
var corporateController = require('./controllers/CorporateController');


//TEST
///router.get('/', EntertainmentController.getAllEntertainmentVisitor);//load main service list


///////
///-----Visitor Viewing routes
//////
//route for viewing an entertainment service for a visitor
router.post('/viewServiceVisitor/',EntertainmentController.getEntertainmentVisitor);

//route for viewing details about the corporate providing a service
router.post('/viewCorporateVisitor/:cem',corporateController.getCorporateVisitor);


///////
///-----Client Viewing routes
//////
//route for viewing an entertainment service for a Client
router.post('/viewServiceClient/,',EntertainmentController.getEntertainmentClient);

//route for viewing details about the corporate providing a service
router.post('/viewCorporateClient/:cem',corporateController.getCorporateClient);


///////
///-----Admin Viewing routes
//////
//route for viewing an entertainment service for an Admin
router.post('/viewServiceAdmin',EntertainmentController.getEntertainmentClient);

//route for viewing details about the corporate providing a service
router.post('/viewCorporateAdmin/:cem',corporateController.getCorporateAdmin);



module.exports = router;
