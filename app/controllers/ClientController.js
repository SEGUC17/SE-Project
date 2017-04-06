         let Entertainment = require('../models/entertainments');
         let Clients=require('../models/clients');
         let ClientController={
           rateEntertainment:function (req,res) {//rate entertainment
                 Entertainment.findOne({_id:req.body.id},function (err,success) {
                     if(err)
                         console.log(err.message);
                     else{
                         if(success){
                      //    console.log(success.rating);
                             var num=parseFloat(success.rating.length);
                          success.rating.push(req.body.rating);

                       //      console.log(success.rating);
                         // console.log(success.rating.length);
                          num++;
                          var i=0;
                          var rating=0;
                          for (i=0;i<num;i++){
                              rating=rating+success.rating[i];
                           //   console.log(rating);
                          }
                          rating=rating/parseFloat(num);
                             success.actualRating=rating;
                             //console.log(rating);
                             success.save(function (err,req) {
                                 if(err)
                                     console.log(err.message);
                                 else{
                                    // console.log(success.numberOfRatings);
                                     Entertainment.findOne({_id:req.body.id},function (err,Entertainments) {
                                         //res.render('rate',{Entertainments});
                                         res.json[{success:true,Entertainments:Entertainments}];
                                     })
                                 }

                             })
                         }
                     }

                 })

             },
	getSpecificEntertainment:function(req,res){
Entertainment.findOne({_id:req.body.id},function(err,Entertainments){
res.json[{success:true,Entertainments:Entertainments}];
})
}
         }
         module.exports=ClientController;
