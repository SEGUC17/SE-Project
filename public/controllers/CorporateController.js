var app = angular.module("CorporateApp", []);

app.controller("Register_Corporate", function($scope, $window, $http){
  var status;
  $scope.regCorporate = function(regCorp){
    $http.post('/corporate/signup',regCorp).then(function successCallback(response){

      if(response.data.success==false){
          alert("Email Already Taken");
      }
      else{

          $window.location.href = "/login_corporate"
      }

      console.log(response.data.success);

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);

  })

    }
});

app.controller("Login_Corporate", function($scope, $window,$http){
  var status;
  console.log("asdsa");
      $scope.loginCorporate = function(logCorp){
        $http.post('/corporate/login',logCorp).then(function successCallback(response){

          if(response.data.success==false){
            alert("Email or Password is incorrect");
          }

          else{
            var corporate=response.data.user;
            var online=2;
            localStorage.setItem("corporate", JSON.stringify(corporate));
            localStorage.setItem("online", JSON.stringify(online));
            $window.location.href = "/";
          }

          console.log(response.data.success);

        }, function errorCallback(response) {//needs handling

          console.log(response.data.success);

      })
       }

   });


   app.controller("logout_Corporate", function($scope,$window, $http) {
     console.log("hi");
     $scope.regCorporatelogout= function(){
       $http.post('/corporate/logout').then(function successCallback(response){

   var online=0;

   localStorage.setItem("online", JSON.stringify(online));
   $window.location.reload();


       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })
