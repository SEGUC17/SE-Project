var express = require('express');
var session = require('express-session');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
<<<<<<< HEAD
var DB_URI = "mongodb://localhost:27017/se-project";
var crypto = require('crypto');
var passport = require('passport');
var path = require('path');
require('./config/passport')(passport);
var cors  = require('cors');


=======
var DB_URI = "mongodb://localhost:27017/MET";
var fs = require('fs');
>>>>>>> roshdy
var app = express();
var multer = require('multer');

// var upload = multer({ dest: 'uploads/' })

// Loading Angular Components ..
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(__dirname+ '/public'));
<<<<<<< HEAD
app.use(session({secret: 'ADSADS', cookie: { maxAge : 3600000 * 48 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
=======
>>>>>>> roshdy
mongoose.connect(DB_URI);
app.use(router);
// start the server
<<<<<<< HEAD
app.listen(8080, function(){
    console.log("server is listening on port 8080");
});
=======
app.listen(2342, function(){
    console.log("server is listening on port 2342");
})
>>>>>>> roshdy
