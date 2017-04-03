/**
 * Created by killbill on 02/04/17.
 */

var mongoose = require('mongoose');

var CorporateSchema = mongoose.Schema({

    name:String,

    about:String,

    address:String,

    type:String,

    rating: Number,

    hash: String,

    salt: String,

    request: Boolean,

    accepted: Boolean,

    email:{
        type: String,
        unique:true
    },


    phone_number:{
        type: String,
        unique:true
    },


    username :{
        type: String,
        unique : true
    },


    business_name: {
        type: String,
        unique: true
    },

    business_number:{
        type:String,
        unique: true
    }


});

var Corporate = mongoose.model("corporate", CorporateSchema);

module.exports = Corporate;