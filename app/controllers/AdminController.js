var mongoose = require("mongoose")
var corporate = require('../models/corporate')
var Client = require('../models/client')
var Entertainment = require('../models/entertainment')
var admin = require('../models/admin')

module.exports = {
  checkAuthentication(req, res, next) {
    if (req.session.admin) {
      return next()
    }
    res.status(401).send('You are unauthorized to access this page')
  },
  login:function(req,res){//bayna men esmaha
      admin.findOne({username:req.body.username,password:req.body.password},function (err,found) {
          if(found){
              req.session.admin=true;
              req.user = found
              res.json[{success:true}];
          }
          else{
              res.json[{success:false}];
          }

      })
  },
  removeClient:function (req,res){
  	if(req.body.criteria){
  		Client.findByIdAndRemove({"_id":req.body.criteria}, function(err,client){
  			if(!client){
  				res.json({success: false, message:"Sorry could'nt find that client"})
  			}
  			else {
  				res.json({success: true, message:"Client removed successfully"});
  			}
  		})
  	}

  },
  getAllCorporates:function(req, res){
     corporate.find({} ,function(err, corporates){
           if(err)
           res.json({success: false, error: "enexpected error"}) //res.send(err.message);
           else
           res.json({success: true, corp: corporates});
       })
  },
  getCorporate: function(req, res){
     corporate.find({ _id: req.params.cem.substring(1)  } ,function(err, corporates){
         if(err)
          res.json({success: false, error: "enexpected error, corporate not found"}) //res.send(err.message);
         else
          res.json({success: true, corp: corporates});//render the view for admin
      })
  },
  getAllServices:function(req,res){//bagib kol el entertainments 3amatan le ay sherka 3shan ana admin we leya kol el sala7yat
        Entertainment.find(function(err,Entertainments){
            if(err)
                res.send(err)
            else
            //  res.render('admin',{Entertainments});
                res.json[{success:true,Entertainments:Entertainments}];
        })
    },
    getNewCorporateRequests: function (req, res) {
        Corporate.find({request: true}, function (err, corp) {
            if (corp) {
                res.json({success: true, corporations: corp})
            }else{
                res.json({success: false, error: "Failed to retrieve corporation requests"})
            }
        });
    },
    acceptCorporate:function(req,res){
        var e = req.params.cem.substring(1);
        Corporate.findOne({'local.email':e},function(err,corp){
            if(corp) {
                corp.Accepted = true;
                corp.request=false;
                corp.save(function(err,corp){
                    if (err) {
                        console.log(err)
                        res.json({success: false, error: "An unexpected error occured while updating the corporation"})
                    }else {
                        res.json({success: true})
                    }
                })
            }
        })
    },
    rejectCorporate:function(req,res){
        var e = req.params.cem.substring(1);
        Corporate.findOne({'local.email':e},function(err,corp){
            if(corp) {
                corp.Accepted = false;
                corp.request=false;
                corp.save(function(err,corp){
                    if (err) {
                        console.log(err);
                        res.json({success: false, error: "An unexpected error occured while updating the corporation"})
                    }else {
                        res.json({success: true})
                    }
                })

            }
        })
    },
    removeService:function(req,res){//remove some entertainment service
        //  console.log(req.body.name);
        Entertainment.findOne({_id:req.body.id},function(err,found){

            if(err)
                res.send(err);
            else{
                if(found){
                    console.log("found");
                    Entertainment.remove({_id:req.body.id},function(err,success){
                        if(err)
                            console.log(err);
                        else{
                            Entertainment.find({email:req.user.local.email},function(err,Entertainments){
                                if(err){
                                    res.send(err)

                                    //  console.log("karim");
                                }
                                else
                                //      res.render('admin',{Entertainments});
                                    res.json[{success:true,Entertainments:Entertainments}];
                            })
                        }
                    })
                }
                else{
                    // res.render('admin',{});
                }
            }
        })
    },
    getCorporateServices:function(req,res){//get services of a specific Corporate
        Entertainment.find({email:req.body.email},function (req,Entertainments) {

            res.json[{success:true,Entertainments:Entertainments}];
        })
    },
    getAllClients:function(req,res){//bagib kol el clients
        clients.find(function(req,clients){
            res.json[{sucesss:true,clients:clients}];
        })
    }
}
