var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/MET";
var fs = require('fs');
var app = express();
var passport = require('passport');
var path = require('path');
require('./config/passport')(passport);


app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(__dirname+ '/public'));
app.use(session({secret: 'ADSADS'}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(DB_URI);
app.use(router);
// start the server
app.listen(2342, function(){
    console.log("server is listening on port 2342");
})