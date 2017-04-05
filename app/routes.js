var express = require('express');
var router = express.Router();
var clientController = require('./controllers/ClientController')
var passport = require('passport')
require('./models/entertainment')
require('./models/review')

router.get('/client/login/facebook', clientController.facebookLogin);
router.get('/client/login/facebook/cb', clientController.facebookLogin);

router.post('/client/signup', clientController.localSignup)

router.post('/client/login', clientController.localLogin);

router.post('/client/logout', clientController.logout)

router.post('/client/recover', clientController.recoverPassword)

router.post('/client/verifyToken', clientController.verifyRecoveryToken)

router.post('/client/reset', clientController.resetPassword)

module.exports = router;
