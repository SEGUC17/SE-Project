var express = require('express');
var router = express.Router();
var clientController = require('./controllers/clientController');
var adminController = require('./controllers/adminController');



// add routes
router.post('/visitor/search',clientController.visitorSearch);
router.post('/client/search',clientController.clientSearch);
router.post('/admin/search',adminController.adminSearch);
router.post('/admin/RemoveClient',adminController.adminRemoveClient);






//export router

module.exports = router;
