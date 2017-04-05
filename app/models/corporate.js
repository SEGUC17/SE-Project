var mongoose = require('mongoose');
var CorporateSchema = mongoose.Schema({
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
    Accepted:Boolean
})

ClientSchema.methods.validPassword = function(salt, password, hash) {
    var enteredHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return enteredHash === hash
}
var Corporate = mongoose.model("Corporate", CorporateSchema);
module.exports = Corporate;