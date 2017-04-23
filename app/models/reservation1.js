/**
 * Created by karim on 4/21/17.
 */
    var mongoose = require('mongoose');
    var reservationTime=require('../models/reservationTime');
    var reservationSchema=mongoose.Schema({
        reservationTime:{type:mongoose.Schema.Types.Object,ref:'reservationTime'},
        email:String,
        price:Number,
        name:String,
        id:String
    })
    var reservation=mongoose.model("reservation",reservationSchema);
    module.exports=reservation;
