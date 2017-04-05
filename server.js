<<<<<<< HEAD
<<<<<<< HEAD
=======
//require depenciess
>>>>>>> 3ee328bc421657f5a809cda0d3b278c0341a2519
=======
//require depenciess
>>>>>>> b61b193b222f63af367c24e831fca155e34ce1cf
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
<<<<<<< HEAD
<<<<<<< HEAD
var DB_URI = "mongodb://localhost:27017/MET";
var fs = require('fs');
var app = express();

app.set('view engine', 'ejs');
=======
var DB_URI = "mongodb://localhost:27017/se-project";
var bycrpt = require('bcrypt');
var passport = require('passport');
var path = require('path');
var cors  = require('cors');


var app = express();

>>>>>>> 3ee328bc421657f5a809cda0d3b278c0341a2519
=======
var DB_URI = "mongodb://localhost:27017/se-project";

var app = express();

>>>>>>> b61b193b222f63af367c24e831fca155e34ce1cf

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
<<<<<<< HEAD
<<<<<<< HEAD
mongoose.connect(DB_URI);
app.use(router);
// start the server
app.listen(2342, function(){
    console.log("server is listening on port 2342");
})
=======
=======

>>>>>>> b61b193b222f63af367c24e831fca155e34ce1cf
mongoose.connect(DB_URI);
app.use(router);


// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})
<<<<<<< HEAD
>>>>>>> 3ee328bc421657f5a809cda0d3b278c0341a2519
=======
>>>>>>> b61b193b222f63af367c24e831fca155e34ce1cf
