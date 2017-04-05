


let vSearch = require('../models/schema');
// Change the schema here with the app schema


//Helps in comparing string by changing text to Reg. Expression
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};




visitorSearch:function(req,res){
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
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
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
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(req.query.criteria ==  "price"){

			vSearch.find({"price":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(req.query.criteria == "type"){

			vSearch.find({"type":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(!(req.query.search)){
			vSearch.find({},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
			})
		} }
				} }}}


clientSearch:function(req,res){
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
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
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
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(req.query.criteria ==  "price"){

			vSearch.find({"price":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(req.query.criteria == "type"){

			vSearch.find({"type":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(!(req.query.search)){
			vSearch.find({},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
			})
		} }
				} }}}

adminSearch:function(req,res){
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
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
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
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(req.query.criteria ==  "price"){

			vSearch.find({"price":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(req.query.criteria == "type"){

			vSearch.find({"type":text},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					if(allItems.length < 1){
						noMatch="No services match that criteria, please try again";
					}
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
				}
			})

		} else {
			if(!(req.query.search)){
			vSearch.find({},function(err, allItems){
				if(err){
					console.log(err);
				}else {
					res.render(/*place here page name*/,{items:allItems, noMatch:noMatch})
				}
			})
		} }
				} }}}
