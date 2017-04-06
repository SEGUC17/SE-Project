var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
 username:String,
    Password:String

})

var admin = mongoose.model("admin", adminSchema);

module.exports = admin;
