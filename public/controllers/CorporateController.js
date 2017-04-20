var app = angular.module("CorporateApp", []);

app.controller("Register_Corporate", function($scope, $window, $http){
  var h = localStorage.getItem("identifier");
  $scope.logedin = h;

  var status;
  $scope.regCorporate = function(regCorp){
    $http.post('/corporate/signup',regCorp).success(function(response){
      status = response.success;
      if(status == true){
        $scope.regStatus = true;
      }else{
        $scope.regStatus = false;
      }
    })
    }
});

app.controller("Login_Corporate", function($scope, $window,$http){
  var status;
      $scope.loginCorporate = function(logCorp){
        //Initialize it here
         $http.post('/corporate/login',logCorp).success(function(response){
          status = response.success;
          if(status == true){
            $scope.logStatus = true;
            console.log($scope.logStatus); // prints true
          }else{
            $scope.logStatus = false;
          }
        })
        console.log($scope.logStatus);
       }
   });
