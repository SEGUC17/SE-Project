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
            $window.location.href = "/profile_corporate";
          }

          console.log(response.data.success);

        }, function errorCallback(response) {//needs handling

          console.log(response.data.success);

      })
       }

   });





   app.controller("profile_corporate", function($scope,$window, $http) {
     var corporate = JSON.parse(localStorage.getItem("corporate"));
     var online1 = JSON.parse(localStorage.getItem("online"));
     console.log(corporate);
     console.log(online1);
     $scope.corporate = corporate;
    console.log(corporate.email);

   })



   app.controller("addannounce", function($scope,$window, $http) {
     $scope.addannounce= function(regData){
       $http.post('/corporate/new/announcment', regData).then(function successCallback(response){

         var corporate=response.data.user;
         localStorage.setItem("corporate", JSON.stringify(corporate));

         $window.location.reload();

       //  $window.location.reload();

       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);
     })
     }
   })


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


   app.controller("addservice", function($scope,$window, $http) {
     $scope.addservice= function(regData){
       $http.post('/corporate/service/add', regData).then(function successCallback(response){

         console.log(response.data.success);
         $window.location.reload();

       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })


   app.controller("getCorporateServices", function($scope,$window, $http) {
       console.log("hi");
       $http.post('/corporate/services').then(function successCallback(response){

         $scope.entertainement_services_corp=response.data.Entertainments;



       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })


   })


   app.controller("removeservice", function($scope,$window, $http) {
     $scope.removeservice= function(regData){
       $http({
         method: 'POST',
         url: '/corporate/service/remove',
         data: "id=" + regData._id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).then(function successCallback(response){
         $window.location.reload();

       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })
