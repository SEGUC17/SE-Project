var express = require('express');
var router = express.Router();
var searchController = require('./controllers/searchController');
var adminRemoveController = require('./controllers/adminRemoveController');


// add routes
router.post('/visitor/search',searchController.visitorSearch);
router.post('/client/search',searchController.clientSearch);
router.post('/admin/search',searchController.adminSearch);
router.get('/admin/RemoveClient',adminRemoveController.adminRemoveClient);






//export router

module.exports = router;
