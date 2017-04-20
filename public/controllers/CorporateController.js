var app = angular.module("CorporateApp", []);

app.controller("Register_Corporate", function($scope, $window, $http){
  var status;
  $scope.regCorporate = function(regCorp){
    $http.post('/corporate/signup',regCorp).then(function successCallback(response){

      console.log(response.data.success);

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);

  })

    }
});

app.controller("Login_Corporate", function($scope, $window,$http){
  var status;
      $scope.loginCorporate = function(logCorp){
        $http.post('/corporate/login',logCorp).then(function successCallback(response){

          console.log(response.data.success);

        }, function errorCallback(response) {//needs handling

          console.log(response.data.success);

      })
       }

   });
