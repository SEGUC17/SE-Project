var app = angular.module("AdminApp", []);

app.controller("adminClients", function($scope,$window, $http) {

    $scope.remove = function(id){
      console.log(id);
      criteria = id;

      $http({
        method: 'POST',
        url: '/admin/remove',
        data: "criteria=" + id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("client removed!");
        $window.location.reload();
      }
    })
    }

    $http.get("/admin/clients").success(function(response){
      $scope.data = response.clients;
    })

});
