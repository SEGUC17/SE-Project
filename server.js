//require depenciess
var express = require('express');
var session = require('express-session');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/se-project";
var crypto = require('crypto');
var passport = require('passport');
var path = require('path');
require('./config/passport')(passport);


var app = express();


// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
app.use(session({secret: 'ADSADS'}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(DB_URI);
app.use(router);


// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
});
