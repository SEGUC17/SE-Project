var mongoose = require('mongoose')
var Corporate = require('../models/corporate')
//var Review  = require('../models/review')
//var crypto = require('crypto')
//var passport = require('passport')

module.exports = {




//////////////////////////////
/////////----------Viewing
/////////////////////////////

//-----Visitor corporate controllers

 //get all corporates objects for a visitor
   getAllCorporatesVisitor:function(req, res){

     corporate.find({} ,function(err, corporates){



       if(err)
       res.json({success: false, error: "unexpected error"}) //res.send(err.message);
       else
       res.json({success: true, corp: corporates});
       })
   },
   //get the requested corporate for a visitor
   getCorporateVisitor: function(req, res){


   corporate.find({ _id: req.params.cem.substring(1)  } ,function(err, corporates){
     if(err)
     res.json({success: false, error: "unexpected error"}) //res.send(err.message);
     else
     res.json({success: true, corp: corporates});
         })
     },


//-----Client corporate controllers

     //get all corporates objects for a client
       getAllCorporatesCleint:function(req, res){

         corporate.find({} ,function(err, corporates){



           if(err)
           res.json({success: false, error: "unexpected error"}) //res.send(err.message);
           else
           res.json({success: true, corp: corporates});//render the view for client
           })
       },


       //get the requested corporate for a client
       getCorporateClient: function(req, res){


       corporate.find({ _id: req.params.cem.substring(1)  } ,function(err, corporates){
         if(err)
         res.json({success: false, error: "unexpected error, corporate not found"}) //res.send(err.message);
         else
         res.json({success: true, corp: corporates}); //render the view for client
             })
         },

//----ADMIN corporate controllers


         //get all corporates objects for an admin
           getAllCorporatesAdmin:function(req, res){

             corporate.find({} ,function(err, corporates){



                   if(err)
                   res.json({success: false, error: "enexpected error"}) //res.send(err.message);
                   else
                   res.json({success: true, corp: corporates});
      // res.render('', {corporates});//render the view for admin
               })
           },
           //get the requested corporate for a Admin
           getCorporateAdmin: function(req, res){


           corporate.find({ _id: req.params.cem.substring(1)  } ,function(err, corporates){
             if(err)
             res.json({success: false, error: "enexpected error, corporate not found"}) //res.send(err.message);
             else
             res.json({success: true, corp: corporates});//render the view for admin
                 })
             }







}
