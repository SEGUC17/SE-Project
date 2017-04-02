var mongoose = require('mongoose');

var entertainmentSchema = mongoose.Schema({
    name:String,
    phone:String,
    price:String,
    location:String,
    type:String,
    email:{
    	type:String,
    	required:true,
    	unique:true
    }
})

var schema = mongoose.model("project", entertainmentSchema);

module.exports = schema;
