var mongoose = require('mongoose');


var EntertainmentSchema = mongoose.Schema({
  name : String,
  phone: String,
  price: String,
  location: String,
  type: String,
  email: {
    type:String,
    required:true,
    unique:true
}
})


var Entertainment = mongoose.model("Entertainment",EntertainmentSchema);

module.exports = Entertainment;
