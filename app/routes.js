var express = require('express');
var router = express.Router();
var clientController = require('./controllers/ClientController')
var passport = require('passport')

router.get('/client/login/facebook', clientController.facebookLogin);
router.get('/client/login/facebook/cb', clientController.facebookLogin);

router.post('/client/signup', clientController.localSignup)

router.post('/client/login', clientController.localLogin);

router.post('/client/logout', clientController.logout)


module.exports = router;
