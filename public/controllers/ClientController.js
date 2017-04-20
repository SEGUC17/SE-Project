var app = angular.module("ClientApp", []);

app.controller("Register_Client", function($scope,$window, $http) {
  var client = localStorage.getItem("client");
  console.log(client);
  $scope.regClient= function(regData){
    $http.post('/client/signup',regData).then(function successCallback(response){

      if(response.data.success== false){
        alert("Email or username already taken");
      }

      else{
        $window.location.href = "/login_client"
      }

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

    if(response.data.success== false){
      alert("incorrect username or password");
    }
  else{
        var client=response.data.user;
        localStorage.setItem("client", JSON.stringify(client));
        $window.location.href = "/profile_client"}
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


app.controller("profile_client", function($scope,$window, $http) {


  var client = JSON.parse(localStorage.getItem("client"));
  console.log(client);
  $scope.client = client;
 console.log(client.email);

})


app.controller("edit_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.editClient= function(regData){
    $http.post('/client/edit',regData).then(function successCallback(response){

      var client=response.data.user;
    localStorage.setItem("client", JSON.stringify(client));

      console.log(response.data.success);
      $window.location.reload();

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})
