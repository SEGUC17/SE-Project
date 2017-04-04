var mongoose = require('mongoose');

var ClientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  nationalID: String,
  local: {
      username :{
          type: String,
          unique : true
      },
      hash: String,
      salt: String
  },
  facebook: {
      id: String,
      token: String
  },
  recoveryToken: String //To be used for password recovery
});


var Client = mongoose.model("client", ClientSchema);

module.exports = Client;
