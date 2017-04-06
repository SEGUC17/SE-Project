<<<<<<< HEAD
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

    password: {
        type: String,
        unique: true
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
=======
var mongoose = require('mongoose');
var crypto = require('crypto');
var CorporateSchema = mongoose.Schema({
    name:{
        type :String,
        required:true,
        unique: true
    },
    local: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        hash: String,
        salt: String
    },
    phone:String,
    address: String,
    type: String,
    request:Boolean,
    Accepted:Boolean
})

CorporateSchema.methods.validPassword = function(salt, password, hash) {
    var enteredHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return enteredHash === hash;
}
var Corporate = mongoose.model("corporate", CorporateSchema);
module.exports = Corporate;
>>>>>>> Denden
