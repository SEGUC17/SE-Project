var app = angular.module("ClientApp", []);

app.controller("Register", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/signup',regData).success(function(response){
      status = response.success;
      if(status == true){
        console.log(status);
        $scope.regStatus = true;
      }else{
        $scope.regStatus = false;
      }
    })

  }
})


app.controller("Login", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/login',regData).success(function(response){
      console.log("hi");

      status = response.success;
      if(status == "true"){
        console.log(status);
        $scope.regStatus = true;
      }else{
        $scope.regStatus = false;
      }
    })

  }
})
