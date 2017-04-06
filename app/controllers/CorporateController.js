let Entertainment = require('../models/entertainments');

let CorporateController= {
    add: function (req, res) { //1-add new Entertainment(Email is got from the session or passport)
        let entertainment = new Entertainment(req.body);
        entertainment.email = req.user.local.email;
        entertainment.save(function (err, register) {
            if (err) {
                console.log(err);
                res.send(err.message);
            } else {

                Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
                    if (err)
                        res.send(err)
                    else
                    //     res.render('index',{Entertainments});
                        res.json[{success: true, Entertainments: Entertainments}];
                })
            }
        })

    },
    addEntertainment: function (req, res) {//2-Ghaleban Malhash lazma kan el gharad menha redirecting
        res.json({success: true});

    },
    get: function (req, res) {  //3- Get all the entertainment services related to some Corporate using his email(foreign key)
        Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
            if (err)
                res.send(err)
            else
            //  res.render('index',{Entertainments});

                res.json[{success: true, Entertainments: Entertainments}];
        })
    },
    getEntertainment: function (req, res) { //4-get the entertainment page(either further details,remove,edit info)
        Entertainment.findOne({_id: req.body.id}, function (req, Entertainments) {
            res.json[{success: true, Entertainments: Entertainments}];

        })
    },
    remove: function (req, res) {//remove some entertainment service
        //  console.log(req.body.name);
        Entertainment.findOne({_id: req.body.id}, function (err, found) {

            if (err)
                res.send(err);
            else {
                if (found) {
                    console.log("found");
                    Entertainment.remove({_id: req.body.id}, function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
                                if (err) {
                                    res.send(err)

                                    //  console.log("karim");
                                }
                                else
                                //      res.render('admin',{Entertainments});
                                    res.json[{success: true, Entertainments: Entertainments}];
                            })
                        }
                    })
                }
                else {
                    // res.render('admin',{});
                }
            }
        })
    },
    editEmail: function (req, res) {//edit email of some Entertainment service(ghaleban hatetshal 3shan man3oksh el denia le2in el mail da some sort of a foreign key
        var collection = Entertainment.findOne({_id: req.body.id}, function (err, success) {
            if (err)
                console.log(err);
            else {
                if (success) {
                    success.email = req.user.local.email;
                    success.save(function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({_id: req.body.id}, function (err, Entertainments) {
                                //    res.render('edit',{Entertainments});
                                res.json[{success: true, Entertainments: Entertainments}];
                            })
                        }
                    })

                }
                else {
                    res.render('/');
                }
            }

        })
    },
    editName: function (req, res) { //edit le 7aga tania
        var collection = Entertainment.findOne({_id: req.body.id}, function (err, success) {
            if (err)
                console.log(err);
            else {
                if (success) {
                    success.name = req.body.name1;
                    success.save(function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({_id: req.body.id}, function (err, Entertainments) {
                                //      res.render('edit',{Entertainments});
                                res.json[{success: true, Entertainments: Entertainments}];
                            })
                        }
                    })

                }
                else {
                    res.render('/');
                }
            }

        })
    },
    editLocation: function (req, res) {//edit le7aga tania
        var collection = Entertainment.findOne({_id: req.body.id}, function (err, success) {
            if (err)
                console.log(err);
            else {
                if (success) {
                    success.location = req.body.location;
                    success.save(function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({_id: req.body.id}, function (err, Entertainments) {
                                //     res.render('edit',{Entertainments});
                                res.json[{success: true, Entertainments: Entertainments}];
                            })
                        }
                    })

                }
                else {
                    res.render('/');
                }
            }

        })
    },
    editPhone: function (req, res) {//edit le7aga rab3a
        var collection = Entertainment.findOne({_id: req.body.id}, function (err, success) {
            if (err)
                console.log(err);
            else {
                if (success) {
                    success.phone = req.body.phone;
                    success.save(function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({_id: req.body.id}, function (err, Entertainments) {
                                //   res.render('edit',{Entertainments});
                                res.json[{success: true, Entertainments: Entertainments}];
                            })
                        }
                    })

                }
                else {
                    res.render('/');
                }
            }

        })
    },
    editPrice: function (req, res) { //edit le7aga sata
        var collection = Entertainment.findOne({_id: req.body.id}, function (err, success) {
            if (err)
                console.log(err);
            else {
                if (success) {
                    success.price = req.body.price;
                    success.save(function (err, success) {
                        if (err)
                            console.log(err);
                        else {
                            Entertainment.find({email: req.body.id}, function (err, Entertainments) {
                                //  res.render('edit',{Entertainments});
                                res.json[{success: true, Entertainments: Entertainments}];
                            })
                        }
                    })

                }
                else {
                    res.render('/');
                }
            }

        })
    },
    edit: function (req, res) {//bagib el page eli ha edit fiha el entertainment service eli ana e5tartaha
        Entertainment.find({_id: req.body.id}, function (req, Entertainments) {
            // res.render('edit',{Entertainments});
            res.json[{success: true, Entertainments: Entertainments}];
        })
    },
    removeServiceCorporate: function (req, res) {//bagib hagati ana bas mmken aghayar asamihom le get services corporate we get services admin bas msh delwa2ti
        Entertainment.find({email: req.user.local.email}, function (err, Entertainments) {
            res.json[{success: true, Entertainments: Entertainments}];
        })
    }
}

    module.exports=CorporateController;