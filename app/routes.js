var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/client/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
router.get('/client/login/facebook/cb', passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/'}))


module.exports = router;
