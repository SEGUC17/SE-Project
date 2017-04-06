let vSearch = require('../models/entertainment'); 
// Change the schema here with the app schema


//Helps in comparing string by changing text to Reg. Expression
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


let aRemove = require('../models/client');

function adminRemoveClient(req,res){

	if(req.query.criteria){
		aRemove.find({"username":req.query.criteria}, function(err,client){
			if(err){
				res.json({success: false, message:"Sorry could'nt find that client"})
			} else {
				aRemove.remove({"username":req.query.criteria});
				res.json({success: true, message:"Client removed successfully"});
			}
		})
	}

}



function adminSearch(req,res){
		var noMatch=null;
		const text = new RegExp(escapeRegex(req.query.search), 'gi');

		if(req.query.criteria == "name"){

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
			if(req.query.criteria == "location"){

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
			if(req.query.criteria ==  "price"){

			vSearch.find({"price":text},function(err, allItems){
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
			if(req.query.criteria == "type"){

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
			if(!(req.query.search)){
			vSearch.find({},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
			})
		} }
				} }}}				
