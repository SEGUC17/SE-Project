let corporate = require('../models/corporate');
var crypto = require('crypto');

var email_session = "";


//Files Uploader...
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var video_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/videos')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.m4v')
  }
})

var upload = multer({ storage: storage }).single('ProfileImage');
var video_upload = multer({ storage: video_storage }).single('ProfileVideo');



let controller = {
    SignUp: function (req, res) {
        var password = req.body.password;
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64,'sha512').toString('hex');
        let corp = new corporate({name:req.body.name,email:req.body.email,hash:hash,salt:salt,phone:req.body.phone,address:req.body.address,type:req.body.type,request:true,Accepted:false});
        corp.save(function(err, corp){
            if(err){
                var registered = false;
                res.render('register',{registered});
            }else {
                var registered = true;
                var loggedin = false
                res.render('login',{registered,loggedin});
            }

            })
    },
    login:function(req,res){
        corporate.findOne({email:req.body.email},function(err,corp){
            if(err){
                res.send(err.message);
                var loggedin = false;
                res.render('login',loggedin);
            }else{
                if(corp){
                  email_session = req.body.email;
                    var salt = corp.salt;
                    console.log(salt);
                    var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64,'sha512').toString('hex');
                    if(hash === corp.hash){
                        var loggedin = true;
                        var registered = false;
                        var uploaded = false;
                        // res.render('login',{loggedin,registered});
                        console.log('Logged in !')
                        res.render('media',{loggedin,uploaded,corp});
                    }else{
                        var loggedin = false;
                        var registered = false
                        console.log('Not Encrypted !')
                        res.render('login',{loggedin,registered});
                    }
                }else{
                    var loggedin = false;
                    var registered = false;
                    console.log('Not Registered !')
                    res.render('login',{loggedin,registered});
                }
            }
        })

    },
    requests:function(req,res){
        corporate.find({request:false},function(err,corp){
            if(corp){
                console.log("yes");
                res.render('requests',{corp});
            }
        });
    },


    // Media Adding to corporate
    addMedia:function(req, res){
     upload(req, res, function (err) {
       corporate.findOne({email: email_session}, function(err, corp){
         if(err){
             res.send(err.message);
             var loggedin = false;
             res.render('login',loggedin);
         }else {
           var uploaded = false;
           var loggedin = true;
           if (err) {
             // An error occurred when uploading
             console.log('Error while Uploading media.')
             return res.end("Error uploading file.");
           }
           console.log('Uploaded Image Successfully .')
          //  var result =  req.file.path;
          //  console.log(result)
          var new_image = req.file.filename;
           var file = '/uploads/images/' + req.file.filename;
           console.log(__dirname+'/../')
           console.log(file)

           uploaded = true;
           // Pushing Image Name String
           corp.images.push(new_image)
           //Saving the new image to Corporate
           corp.save()
          //  console.log(req.file);

           //Checking Using Postman..
           res.json[{
             success: true,
             message: 'Image Uploaded'
           }]
           res.render('media', {loggedin,uploaded,uploaded_image: file,corp});
         }
       })


     })

   },


   addVideo:function(req, res){
    video_upload(req, res, function (err) {
      corporate.findOne({email: email_session}, function(err, corp){
        if(err){
            res.send(err.message);
            var loggedin = false;
            res.render('login',loggedin);
        }else {
          var uploaded = false;
          var loggedin = true;
          if (err) {
            // An error occurred when uploading
            console.log('Error while Uploading media.')
            return res.end("Error uploading file.");
          }
          console.log('Uploaded Video Successfully .')
         //  var result =  req.file.path;
         //  console.log(result)
         var new_video = req.file.filename;
          var file = '/uploads/videos/' + req.file.filename;
          console.log(__dirname+'/../')
          console.log(file)

          uploaded = true;
          // Pushing Image Name String
          corp.videos.push(new_video)
          //Saving the new image to Corporate
          corp.save()
         //  console.log(req.file);

          //Checking Using Postman..
          res.json[{
            success: true,
            message: 'Video Uploaded'
          }]
          res.render('media', {loggedin,uploaded,uploaded_image: file,corp});
        }
      })


    })

  }


}
module.exports = controller;
