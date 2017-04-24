var app = angular.module("CorporateApp", ['ngFileUpload']);

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
            if(response.data.error==1){
              alert("Your Account has not been activated");
            }
            else{
                  alert("Email or Password is incorrect");
            }

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





   app.controller("getCorpService", function($scope,$window, $http) {
     $scope.service;
     $scope.getCorpService= function(regData){
       $http({
         method: 'POST',
         url: '/corporate/service',
         data: "id=" + regData._id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).then(function successCallback(response){

       var service_corp=response.data.Entertainments;
       console.log(service_corp);
       localStorage.setItem("service", JSON.stringify(service_corp));
      $window.location.href = "/entertainement_service/"+regData._id;

       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })



   app.controller("service_corporate", function($scope,$window, $http) {
     var service_corp = JSON.parse(localStorage.getItem("service"));
     console.log(service_corp);
     $scope.service_corp = service_corp;
   })



   app.controller("reportreview", function($scope,$window, $http) {
     $scope.reportreview= function(regData){
    regData.reviewID=regData._id
    var service_corp = JSON.parse(localStorage.getItem("service"));
    regData.id=service_corp._id;
    console.log(regData);
$http.post('/corporate/reportReview/', regData).then(function successCallback(response){

       localStorage.setItem("service", JSON.stringify(response.data.Entertainments));
           $window.location.reload();
       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })






   app.controller("editservice", function($scope,$window, $http) {
     console.log("hi");
     $scope.editservice= function(regData){

       var service_corp = JSON.parse(localStorage.getItem("service"));

       regData.id = service_corp._id;


       $http.post('/corporate/service/edit', regData).then(function successCallback(response){

         var service_corp = response.data.Entertainments;
        localStorage.setItem("service", JSON.stringify(service_corp));
        $window.location.reload();

       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })



   app.directive('fileModel', ['$parse', function ($parse) {
     return {
         restrict: 'A',
         link: function(scope, element, attrs) {
             var model = $parse(attrs.fileModel);
             var modelSetter = model.assign;

             element.bind('change', function(){
                 scope.$apply(function(){
                     modelSetter(scope, element[0].files[0]);
                 });
             });
         }
     };
 }]);

 app.service('fileUpload', ['$http','$window', function ($http,$window) {
     this.uploadFileToUrl = function(file, uploadUrl, x){
         var fd = new FormData();
         if(x==0){
           var service_corp = JSON.parse(localStorage.getItem("service"));
            fd.append('id', service_corp._id);
         }
         else{
           var service_corp = JSON.parse(localStorage.getItem("corporate"));
           fd.append('id', service_corp._id);
         }

         fd.append('file', file);

         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
         }).then(function successCallback(response){

           if(x==0){
           var service_corp = response.data.Entertainments;
           localStorage.setItem("service", JSON.stringify(service_corp));
            }

            else{
              var corp = response.data.corp;
              localStorage.setItem("corporate", JSON.stringify(corp));
            }
           $window.location.reload();


         }, function errorCallback(response) {//needs handling

           console.log(response.data.success);


       })
     }
 }]);

 app.controller('upload_image_service', ['$scope', 'fileUpload','$window' , function($scope, fileUpload, $window){



     $scope.uploadFile = function(){
         var file = $scope.myFile;
         console.log('file is ' );
         console.dir(file);
         var uploadUrl = "/corporate/addMedia/file";
         if(file){
           fileUpload.uploadFileToUrl(file, uploadUrl, 0);

         }
         else alert("No input File");
     };



 }]);


 app.controller('upload_video', ['$scope', 'fileUpload', function($scope, fileUpload){

     $scope.uploadFile = function(){
         var file = $scope.myFile;
         console.log('file is ' );
         console.dir(file);
         var uploadUrl = "/corporate/addVideo/file";
         if(file) fileUpload.uploadFileToUrl(file, uploadUrl, 0);
         else alert("No input File");
     };



 }]);


 app.controller('upload_profile_picture', ['$scope', 'fileUpload', function($scope, fileUpload){

     $scope.uploadFile = function(){
         var file = $scope.myFile;
         console.log('file is ');
         console.dir(file);
         var uploadUrl = "/corporate/addimage/file";
         if(file) fileUpload.uploadFileToUrl(file, uploadUrl, 1);
         else alert("No input File");
     };

 }]);



 app.controller("addtime", function($scope,$window, $http) {
   console.log("hi");
   $scope.addtime= function(regData){

     var service_corp = JSON.parse(localStorage.getItem("service"));
     regData.id = service_corp._id;


     $http.post('/corporate/service/timing', regData).then(function successCallback(response){

      var service_corp = response.data.Entertainments;
      localStorage.setItem("service", JSON.stringify(service_corp));
      $window.location.reload();

     }, function errorCallback(response) {//needs handling

       console.log(response.data.success);


   })

   }
 })



 app.controller("corpinfoo", function($scope,$window, $http) {


   $http.post("/corporate/infoo").then(function successCallback(response){
       var y = response.data.corporate;
       $scope.corporate = y;
       console.log(y);
     }, function errorCallback(response) {//needs handling



   })


 })


 app.controller("EntCtrl", function($scope,$window, $http,$routeParams) {

 var id= $routeParams.id;
 console.log(id);

 var req = {
  method: 'POST',
  url: '/client/service',
  data: "id=" + id,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }


 $http({
   method: 'POST',
   url: '/client/service',
   data: "id=" + id,
   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }).then(function(response){
    $scope.service = response.data.Entertainments;
    localStorage.setItem("service", JSON.stringify(response.data.Entertainments));
    console.log(response);
    });


 })



 app.controller("corpsCtrl", function($scope,$window, $http,$routeParams) {

 var id= $routeParams.id;
 console.log(id);

 var req = {
  method: 'POST',
  url: '/client/corporates',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }


 $http({
   method: 'POST',
   url: '/client/corporates',
   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }).then(function(response){
    $scope.corporates = response.data.corp;

    console.log(response);
    });


 })


 app.controller("corCtrl", function($scope,$window, $http,$routeParams) {

 var id= $routeParams.id;
 console.log(id);

 var req = {
  method: 'POST',
  url: '/client/corporate',
  data: "_id=" + id,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }


 $http({
   method: 'POST',
   url: '/client/corporate',
   data: "_id=" + id,
   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }).then(function(response){
    $scope.corporate = response.data.corporate;
    localStorage.setItem("corporate", JSON.stringify(response.data.corporate));
    console.log(response.data.error);
    });


 })





 app.controller("servicesCtrl", function($scope,$window, $http,$routeParams) {

 var id= $routeParams.id;
 console.log(id);

 var req = {
  method: 'POST',
  url: '/client/services',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }


 $http({
   method: 'POST',
   url: '/client/services',
   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }).then(function(response){
    $scope.services = response.data.Entertainments;

    console.log(response);
    });


 })
