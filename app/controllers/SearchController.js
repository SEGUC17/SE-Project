let Entertainment = require('../models/entertainment');
// Change the schema here with the app schema
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//Helps in comparing string by changing text to Reg. Expression
module.exports ={
 search:function(req,res){
		var noMatch=null;
		const text = new RegExp(escapeRegex(req.body.search), 'gi');
		if(req.body.criteria == "name"){

			Entertainment.find({"name":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						//console.log(allItems.length);
						noMatch="No services match that criteria, please try again";
					}

					res.json({success:true,items:allItems, noMatch:noMatch});

				}
			})

		} else {
			if(req.body.criteria == "location"){

			Entertainment.find({"location":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
				}
			)}

		 else {
			if(req.body.criteria ==  "price"){

			Entertainment.find({"price":req.body.search},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
				}
			)}

		 else {
			if(req.body.criteria == "type"){

			Entertainment.find({"type":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
				}
			)}

		 else {
			if(!(req.body.search)){
			Entertainment.find({},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					res.json({success:true,items:allItems, noMatch:noMatch})
				}
			})
		} }
				} }}}
,
}
