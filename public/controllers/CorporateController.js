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
       localStorage.setItem("service_corp", JSON.stringify(service_corp));
      $window.location.href = "/entertainement_service";

       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })



   app.controller("service_corporate", function($scope,$window, $http) {
     var service_corp = JSON.parse(localStorage.getItem("service_corp"));
     console.log(service_corp);
     $scope.service_corp = service_corp;
   })



   app.controller("reportreview", function($scope,$window, $http) {
     $scope.reportreview= function(regData){
    regData.reviewID=regData._id
    var service_corp = JSON.parse(localStorage.getItem("service_corp"));
    regData.id=service_corp._id;
    console.log(regData);
$http.post('/corporate/reportReview/', regData).then(function successCallback(response){

       localStorage.setItem("service_corp", JSON.stringify(response.data.Entertainments));
           $window.location.reload();
       }, function errorCallback(response) {//needs handling

         console.log(response.data.success);


     })

     }
   })






   app.controller("editservice", function($scope,$window, $http) {
     console.log("hi");
     $scope.editservice= function(regData){

       var service_corp = JSON.parse(localStorage.getItem("service_corp"));

       regData.id = service_corp._id;


       $http.post('/corporate/service/edit', regData).then(function successCallback(response){

         var service_corp = response.data.Entertainments;
        localStorage.setItem("service_corp", JSON.stringify(service_corp));
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

 app.service('fileUpload', ['$http', function ($http) {
     this.uploadFileToUrl = function(file, uploadUrl, x){
         var fd = new FormData();
         if(x==0){
           var service_corp = JSON.parse(localStorage.getItem("service_corp"));
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
           localStorage.setItem("service_corp", JSON.stringify(service_corp));
            }

            else{
              var corp = response.data.corp;
              localStorage.setItem("corporate", JSON.stringify(corp));
            }
           //$window.location.reload();


         }, function errorCallback(response) {//needs handling

           console.log(response.data.success);


       })
     }
 }]);

 app.controller('upload_image_service', ['$scope', 'fileUpload', function($scope, fileUpload){

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
