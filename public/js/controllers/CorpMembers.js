
var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope,$window, $http) {

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

app.controller("Register", function($scope, $window, $http){
  var status;
  $scope.regUser = function(regData){
    $http.post('/corporate/signup',regData).success(function(response){
      status = response.success;
      if(status == true){
        $scope.regStatus = true;
      }else{
        $scope.regStatus = false;
      }
    })
    }
});

app.controller("Login", function($scope, $window,$http){
  var status;
      $scope.loginUser = function(logData){
        //Initialize it here
         $http.post('/corporate/login',logData).success(function(response){
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
