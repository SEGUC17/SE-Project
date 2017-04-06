var mongoose = require("mongoose")
module.exports = {
  getAllServices:function(req,res){//bagib kol el entertainments 3amatan le ay sherka 3shan ana admin we leya kol el sala7yat
        Entertainment.find(function(err,Entertainments){
            if(err)
                res.send(err)
            else
            //  res.render('admin',{Entertainments});
                res.json[{success:true,Entertainments:Entertainments}];
        })
    },
    getNewCorporationRequests: function (req, res) {
        Corporate.find({request: true}, function (err, corp) {
            if (corp) {
                res.json({success: true, corporations: corp})
            }else{
                res.json({success: false, error: "Failed to retrieve corporation requests"})
            }
        });
    },
    acceptCorporation:function(req,res){
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
    rejectCorporation:function(req,res){
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
    loginAdmin:function(req,res){//bayna men esmaha
        admin.findOne({username:req.body.username,password:req.body.password},function (err,found) {
            if(found){
                req.session.admin=true;
                res.json[{success:true,}];
            }
            else{
                res.json[{success:false}];
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
    viewClients:function(req,res){//bagib kol el clients
        clients.find(function(req,clients){
            res.json[{sucesss:true,clients:clients}];
        })
    }
}
