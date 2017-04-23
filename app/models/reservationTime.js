/**
* Created by karim on 4/20/17.
*/
var mongoose = require('mongoose');
var reservationTimeSchema = mongoose.Schema({
  date :Date ,
  startHour : {
      type :Number ,
      min : 0 ,
      max : 23
  },
  startMinute : {
      type : Number ,
      min : 0 ,
      max : 59
  } ,
  booked :{
      type:Boolean,
      default:false
  }

});

var ReservationTime = mongoose.model('reservationTime', reservationTimeSchema);
module.exports = ReservationTime ;
