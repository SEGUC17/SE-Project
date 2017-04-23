var mongoose = require('mongoose')
var reservationTime=require('../models/reservationTime');
var entertainmentSchema = mongoose.Schema({
    email:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true,
    },
    phone:String,
    price:Number,
    location:{
      type:String,
      required:true
    },
    type:String,
    images:[String],
    videos:[String],
    rating:[Number],
    actualRating:{type: Number, default: 0},
    reviews: [{type: mongoose.Schema.Types.Object, ref: 'Review'}],
    reservations:[{type:mongoose.Schema.Types.Object,ref:'reservationTime'}]
})

var Entertainment = mongoose.model("entertainment", entertainmentSchema);

module.exports = Entertainment;
