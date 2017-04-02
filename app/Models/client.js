var mongoose = require('mongoose');

var ClientSchema = mongoose.Schema({

    name:String,

    hash: String,

    salt: String,

    email:{
        type: String,
        unique:true
    },

    phonenumber:{
        type: String,
        unique:true
    },

    username :{
        type: String,
        unique : true
    },

    password: {
        type: String,
        unique: true
    },

    nationalID: {
        type: String,
        unique: true
    }

});

var Client = mongoose.model("client", ClientSchema);

module.exports = Client;