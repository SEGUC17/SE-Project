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
    Accepted:Boolean,
    profileimage:String,

    announcments: { data:[], time: []},
})

CorporateSchema.methods.validPassword = function(salt, password, hash) {
    var enteredHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return enteredHash === hash;
}
var Corporate = mongoose.model("corporate", CorporateSchema);
module.exports = Corporate;
