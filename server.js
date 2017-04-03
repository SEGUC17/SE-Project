var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/MET";
var fs = require('fs');
var app = express();
var multer = require('multer');

var upload = multer({ dest: 'uploads/' })

// Loading Angular Components ..
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
mongoose.connect(DB_URI);
app.use(router);
// start the server
app.listen(2342, function(){
    console.log("server is listening on port 2342");
})
