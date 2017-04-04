var mongoose = require('mongoose');
var projectSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    hash: String,
    salt: String,
    phone:String,
    address: String,
    type: String,
    request:Boolean,
    Accepted:Boolean,
    images:[],
    videos:[],
    announcments: { data:[], time: []},
})

var Corporate = mongoose.model("Corporate", projectSchema);
module.exports = Corporate;
