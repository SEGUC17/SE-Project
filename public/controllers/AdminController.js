var app = angular.module("AdminApp", []);

app.controller("AORCorp", function($scope,$window, $http) { // admin accept or reject corporates
    $scope.accept = function(mail){
      console.log(mail);
      email = mail;

      $http({
        method: 'POST',
        url: '/admin/accept',
        data: "email=" + mail,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("yes");
        $window.location.reload();
      }
    })
    }
    $scope.reject = function(mail){
      console.log(mail);
      email = mail;

      $http({
        method: 'POST',
        url: '/admin/reject',
        data: "email=" + mail,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("yes");
        $window.location.reload();
      }
    })
    }

    $http.get("/admin/requests").success(function(response){
      $scope.data = response.corporations;
    })


});
