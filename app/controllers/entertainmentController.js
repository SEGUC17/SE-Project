let Entertainment = require('../models/entertainments');
let entertainmentController={
  add:function(req,res){
    let entertainment=new Entertainment(req.body);
    entertainment.save(function(err,register){
      if(err){
      console.log(err);
      res.send(err.message);
  }    else{

    Entertainment.find(function(err,Entertainments){
      if(err)
      res.send(err)
      else
      res.render('index',{Entertainments});
    })
    }
  })

},
get:function(req,res){
  Entertainment.find(function(err,Entertainments){
    if(err)
    res.send(err)
    else
    res.render('index',{Entertainments});
  })
},
remove:function(req,res){
  console.log(req.body.name);
  Entertainment.findOne({name:req.body.name},function(err,found){

    if(err)
    res.send(err);
    else{
      if(found){
        console.log("found");
        Entertainment.remove({name:req.body.name},function(err,success){
          if(err)
          console.log(err);
          else{
            Entertainment.find(function(err,Entertainments){
              if(err){
              res.send(err)

              console.log("karim");
                      }
                else
              res.render('admin',{Entertainments});
            })
          }
        })
      }
      else{
        res.render('admin',{});
      }
    }
  })
},
editEmail:function(req,res){
  var collection=Entertainment.findOne({name:req.body.name},function(err,success){
    if(err)
    console.log(err);
    else{
      if(success){
        success.email=req.body.email;
        success.save(function(err,success){
          if(err)
          console.log(err);
          else{
            Entertainment.find(function(err,Entertainments){
              res.render('edit',{Entertainments});
          })
          }
        })

    }
    else{
      res.render('/');
    }
  }

  })
},
    editName:function(req,res){
        var collection=Entertainment.findOne({name:req.body.name},function(err,success){
            if(err)
                console.log(err);
            else{
                if(success){
                    success.name=req.body.name1;
                    success.save(function(err,success){
                        if(err)
                            console.log(err);
                        else{
                            Entertainment.find(function(err,Entertainments){
                                res.render('edit',{Entertainments});
                            })
                        }
                    })

                }
                else{
                    res.render('/');
                }
            }

        })
    },
    editLocation:function(req,res){
        var collection=Entertainment.findOne({name:req.body.name},function(err,success){
            if(err)
                console.log(err);
            else{
                if(success){
                    success.location=req.body.location;
                    success.save(function(err,success){
                        if(err)
                            console.log(err);
                        else{
                            Entertainment.find(function(err,Entertainments){
                                res.render('edit',{Entertainments});
                            })
                        }
                    })

                }
                else{
                    res.render('/');
                }
            }

        })
    },
    editPhone:function(req,res){
        var collection=Entertainment.findOne({name:req.body.name},function(err,success){
            if(err)
                console.log(err);
            else{
                if(success){
                    success.phone=req.body.phone;
                    success.save(function(err,success){
                        if(err)
                            console.log(err);
                        else{
                            Entertainment.find(function(err,Entertainments){
                                res.render('edit',{Entertainments});
                            })
                        }
                    })

                }
                else{
                    res.render('/');
                }
            }

        })
    },
    editPrice:function(req,res){
        var collection=Entertainment.findOne({name:req.body.name},function(err,success){
            if(err)
                console.log(err);
            else{
                if(success){
                    success.price=req.body.price;
                    success.save(function(err,success){
                        if(err)
                            console.log(err);
                        else{
                            Entertainment.find(function(err,Entertainments){
                                res.render('edit',{Entertainments});
                            })
                        }
                    })

                }
                else{
                    res.render('/');
                }
            }

        })
    },
edit:function(req,res){
  Entertainment.find(function(req,Entertainments){
    res.render('edit',{Entertainments});
  })
},
admin:function(req,res){
  Entertainment.find(function(err,Entertainments){
    if(err)
    res.send(err)
    else
    res.render('admin',{Entertainments});
  })
},
rate:function(req,res){
    Entertainment.find(function(req,Entertainments){
        res.render('rate',{Entertainments});
    })
},
rateEntertainment:function (req,res) {
    Entertainment.findOne({name:req.body.name},function (err,success) {
        if(err)
            console.log(err.message);
        else{
            if(success){
             console.log(success.rating);
                var num=parseFloat(success.rating.length);
             success.rating.push(req.body.rating);

                console.log(success.rating);
             console.log(success.rating.length);
             num++;
             var i=0;
             var rating=0;
             for (i=0;i<num;i++){
                 rating=rating+success.rating[i];
                 console.log(rating);
             }
             rating=rating/parseFloat(num);
                success.actualRating=rating;
                console.log(rating);
                success.save(function (err,req) {
                    if(err)
                        console.log(err.message);
                    else{
                       // console.log(success.numberOfRatings);
                        Entertainment.find(function (err,Entertainments) {
                            res.render('rate',{Entertainments});
                        })
                    }

                })
            }
        }

    })

}
}
module.exports=entertainmentController;
/*let Project = require('../models/Project');
let Portfolio=require('../models/Portfolio');
let projectController = {

    getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
            console.log(projects[2].username);
                res.render('index', {projects});
        })
    },

    createProject:function(req, res){
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
                console.log("karim");
            }
            else{

                console.log(project);
                res.redirect('/');
            }
        })
    }
}*/

