let Entertainment = require('../models/entertainment'); 
let Client = require('../models/client');
// Change the schema here with the app schema

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


module.exports = {

adminRemoveClient:function (req,res){

	if(req.body.criteria){
		// aRemove.findOne({"_id":req.body.criteria}, function(err,client){
		// 	if(client.length==0){
		// 		res.json({success: false, message:"Sorry could'nt find that client"})
		// 	} else {
		// 		aRemove.remove({"_id":req.body.criteria});
		// 		res.json({success: true, message:"Client removed successfully"});
		// 	}
		// })

		aRemove.findByIdAndRemove({"_id":req.body.criteria}, function(err,client){
			if(!client){
				res.json({success: false, message:"Sorry could'nt find that client"})
			}
			else {
				res.json({success: true, message:"Client removed successfully"});
			}
		})
	}

}
,


 adminSearch:function(req,res){
		var noMatch=null;
	const text = new RegExp(escapeRegex(req.body.search), 'gi');

		if(req.body.criteria == "name"){

			vSearch.find({"name":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
			})

		} else {
			if(req.body.criteria == "location"){

			vSearch.find({"location":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
				}
			)

		} else {
			if(req.body.criteria ==  "price"){

			vSearch.find({"price":req.body.search},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
				}
			)

		} else {
			if(req.body.criteria == "type"){

			vSearch.find({"type":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
				}
			)

		} else {
			if(!(req.body.search)){
			vSearch.find({},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
			})
		} }
				} }}}}
