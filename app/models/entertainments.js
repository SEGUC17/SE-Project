var mongoose = require('mongoose');

var entertainmentSchema = mongoose.Schema({
    email:{
      type:String,
      rquired:true
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
    rating:[Number],
actualRating:{
        type:Number,
        default:0
}


})

var entertainments = mongoose.model("entertainment", entertainmentSchema);

module.exports = entertainments;

