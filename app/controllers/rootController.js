module.exports = {
  a :function(req,res){
    res.sendfile('./public/views/index.html');
  },

  check : function(req,res){
    if (req.isAuthenticated()) {
      if (req.session.corporate){
        res.json({online:2})
      }
      else if(req.session.client){
        res.json({online:1})
      }
      else{
        res.json({online:0})
      }
    }
    else{
      res.json({online:0})
    }
  }

}
