var express = require('express');
var router = express.Router();
var projectController = require('./controllers/controller');



// add routes
router.post('/visitor/search',searchController.visitorSearch);
router.post('/client/search',searchController.clientSearch);
router.post('/admin/search',searchController.adminSearch);
router.get('/admin/RemoveClient'adminRemoveController.adminRemoveClient);






//export router

module.exports = router;
