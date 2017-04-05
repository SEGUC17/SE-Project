var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
  _creator: {type: String, ref: 'Client'},
  text: String,
})

var entertainmentSchema = mongoose.Schema({
    email:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    phone:String,
    price:Number,
    location:{
      type:String,
      required:true
    },

    type:String,
    rating:Number,
    numberOfRatings:Number,
    reviews: [reviewSchema]

})

var Entertainment = mongoose.model("entertainment", entertainmentSchema);

module.exports = Entertainment;
