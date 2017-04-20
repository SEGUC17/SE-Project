var express = require('express');
var session = require('express-session');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
var passport = require('passport');
var path = require('path');
require('./config/passport')(passport);
var DB_URI = "mongodb://localhost:27017/sea-project";
var app = express();

// Loading Angular Components ..
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(__dirname+ '/public'));
app.use(session({secret: 'ADSADS', cookie: { maxAge : 3600000 * 48 }}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(DB_URI);
app.use(router);
// start the server

app.listen(8080, function(){
    console.log("server is listening on port 8080");
});
