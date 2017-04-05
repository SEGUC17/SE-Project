
let aRemove = require('../models/client');

adminRemoveClient:function(req,res){

	if(req.query.criteria){
		aRemove.find({"username":req.query.criteria}, function(err,client){
			if(err){
				console.log(err);
			} else {
				aRemove.remove({"username":req.query.criteria});
				res.render(/*place here page name*/);
			}
		})
	}

}