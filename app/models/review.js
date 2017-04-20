var mongoose = require('mongoose')

var reviewSchema = mongoose.Schema({
  _service: {type: String, ref: 'entertainment'},
  _creator: {type: String, ref: 'Client'},
  text: String,
  reported: {type: Boolean, default: false}
})

module.exports = mongoose.model("Review", reviewSchema)
