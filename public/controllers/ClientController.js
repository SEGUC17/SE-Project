var app = angular.module("ClientApp", []);

app.controller("Register_Client", function($scope,$window, $http) {
  $scope.regClient= function(regData){
    $http.post('/client/signup',regData).then(function successCallback(response){

      console.log(response.data.success);

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);

  })

  }
})


app.controller("Login_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/login',regData).then(function successCallback(response){

      $scope.client=response.data.user;
      console.log($scope.client);


    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})




app.controller("forget_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/recover',regData).then(function successCallback(response){


      console.log(response.data.success);
      $window.location.href = '/change_password';

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})




app.controller("verify_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/verifyToken',regData).then(function successCallback(response){


      console.log(response.data.success);


    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})
