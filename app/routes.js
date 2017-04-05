var express = require('express');
var router = express.Router();
var searchController = require('./controllers/searchController');
var adminRemoveController = require('./controllers/adminRemoveController');


// add routes
router.post('/visitor/search',projectController.searchController.visitorSearch);
router.post('/client/search',projectController.searchController.clientSearch);
router.post('/admin/search',projectController.searchController.adminSearch);
router.get('/admin/RemoveClient',projectController.adminRemoveController.adminRemoveClient);






//export router

module.exports = router;
