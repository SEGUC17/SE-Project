let Entertainment = require('../models/Entertainment');

let EntertainmentController = {

  //---Entertainment controller for a visitor

  //get all entertainments for a visitor
    getAllEntertainmentVisitor:function(req, res){

      Entertainment.find({} ,function(err, Entertainments){


        if(err)
        res.json({success: false, error: "unexpected error"}) //res.send(err.message);
        else
        res.json({success: true, Ent: Entertainments});
        })
    },

    //get a requested entertainment for a visitor
    getEntertainmentVisitor: function(req, res){


      Entertainment.find({ email: req.params.cem.substring(1)  } ,function(err, Entertainments){
        if(err)
        res.json({success: false, error: "unexpected error"}) //res.send(err.message);
        else
        res.json({success: true, Ent: Entertainments});
        })
      },

      //---Entertainment controller for a Client

      //get all entertainments for a Client
        getAllEntertainmentClient:function(req, res){

          Entertainment.find({} ,function(err, Entertainments){



            if(err)
            res.json({success: false, error: "unexpected error"}) //res.send(err.message);
            else
            res.json({success: true, Ent: Entertainments});
            })
        },

        //get a requested entertainment for a visitor
        getEntertainmentClient: function(req, res){


          Entertainment.find({ email: req.params.cem.substring(1)  } ,function(err, Entertainments){
            if(err)
            res.json({success: false, error: "unexpected error"}) //res.send(err.message);
            else
            res.json({success: true, Ent: Entertainments});
            })
          },


          //---Entertainment controller for an Admin

          //get all entertainments for an Admin
            getAllEntertainmentAdmin:function(req, res){

              Entertainment.find({} ,function(err, Entertainments){
                if(err)
                res.json({success: false, error: "unexpected error"}) //res.send(err.message);
                else
                res.json({success: true, Ent: Entertainments});
                })
            },

            //get a requested entertainment for an Admin
            getEntertainmentAdmin: function(req, res){


              Entertainment.find({ email: req.params.cem.substring(1)  } ,function(err, Entertainments){
                if(err)
                res.json({success: false, error: "unexpected error"}) //res.send(err.message);
                else
                res.json({success: true, Ent: Entertainments});
                })
              }
}

module.exports = EntertainmentController;
