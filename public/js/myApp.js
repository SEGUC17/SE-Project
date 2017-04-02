let corporate = require('../models/corporate');
angular.module('myApp',[]);
    function myCtrl($scope){
    $scope.requestHandler= function(id)
        {
        var idd = $scope.id;
        corporate.findOne({email:idd},function(err,corp){
            if(corp){
                console.log("here");
                corp.Accepted = true;
                corp.save(function(err, corp){

                })
            }
        })
    };

}