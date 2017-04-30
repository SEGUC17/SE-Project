angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/home.html',
        controller : ''
    })

    .when('/v1/', {
      templateUrl: 'app/views/login.html',
      controller: 'loginchatCtrl'
    })
    .when('/v1/ChatRoom', {
      templateUrl: 'app/views/chatRoom.html',
      controller: 'chatRoomCtrl'
    })

    // nerds page that will use the NerdController
    .when('/register_client', {
        templateUrl: 'views/register_client.html',
        controller : ''
    })

    .when('/login_client', {
        templateUrl: 'views/login_client.html',
        controller : ''
    })

    .when('/services/:id', {
        templateUrl: 'views/entertainement_services.html',
        controller : 'servicesCtrl'
    })

    .when('/services_search', {
        templateUrl: 'views/entertainement_services_search.html',
        controller : 'viewSearch'
    })

    .when('/entertainement_service_visitor/:id', {
        templateUrl: 'views/entertainement_service_visitor.html',
        controller : 'EntCtrl',
        resolve: {
        loginccheck: entservice
      }
    })

    .when('/entertainement_service_client/:id', {
        templateUrl: 'views/entertainement_service_client.html',
        controller : 'EntCtrl',
        resolve: {
        loginccheck: entservice
      }
    })

    .when('/entertainement_service/:id', {
        templateUrl: 'views/entertainement_service.html',
        controller : 'EntCtrl',
        resolve: {
        loginccheck: entservice
      }
    })

    .when('/register_corporate', {
        templateUrl: 'views/register_corporate.html',
        controller : ''
    })

    .when('/login_corporate', {
        templateUrl: 'views/login_corporate.html',
        controller : ''
    })

    .when('/profile_client/:id', {
        templateUrl: 'views/profile_client.html',
        controller : 'clientinfoo',
        resolve: {
        logincheck: checkClientLoggedin
      }
    })

    .when('/forget_password', {
        templateUrl: 'views//forget_password.html',
        controller : ''
    })

    .when('/change_password', {
        templateUrl: 'views/change_password.html',
        controller : ''
    })

    .when('/profile_corporate/:id', {
        templateUrl: 'views/profile_corporate.html',
        controller : 'corCtrl',
        resolve: {
        logincheck: checkcorp
      }
    })

    .when('/corporates/:id', {
        templateUrl: 'views/corporates.html',
        controller : 'corpsCtrl'
    })

    .when('/profile_corporate_any/:id', {
        templateUrl: 'views/profile_corporate_any.html',
        controller : 'corCtrl',
        resolve: {
        logincheck: checkcorp
      }
    })

    .when('/admin5518j', {
        templateUrl: 'views/admin/login_admin.html',
        controller : ''
    })

    .when('/admin_page', {
        templateUrl: 'views/admin/admin_page.html',
        controller : '',
        resolve: {
        logincheck: checkAdminLoggedin
      }
    })

    .when('/401', {
        templateUrl: 'views/401.html',
        controller : ''
    })

    .otherwise({
      templateUrl: 'views/404.html',
    })


$locationProvider.html5Mode(true);

}]);




var checkClientLoggedin = function($q, $timeout, $http, $location, $rootScope) {

  var deferred = $q.defer();
  var url = $location.path();
  var id ="";
  var type=0;

  var i=1;
  for(i; i<url.length;i++){
    if(url.charAt(i)=='/'){
      i++
      break
    }
  }

  for(i; i<url.length;i++){
    id+=url.charAt(i);
  }





  $http.post("/check_online").then(function successCallback(response){

      var y = response.data.online;

        if(y==0 || y==2){
        deferred.reject();
        $location.url('/401');
        }
        else{

          var req = {
           method: 'POST',
           url: '/checkclientin',
           data: "id=" + id,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }


          $http({
            method: 'POST',
            url: '/checkclientin',
            data: "id=" + id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function(response){
              if(response.data.success==false){
                deferred.reject();
                $location.url('/401');
              }
              else{
                deferred.resolve();
              }

             console.log(response);
             });

        }




    }, function errorCallback(response) {//needs handling



  })




  return deferred.promise;
}



var checkCorporateLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();
  $http.post('/corporate/checkAuthentication').then(function successCallback(response){

  if(response.data.success){
    var online =2;
      localStorage.setItem("online", JSON.stringify(online));
      deferred.resolve();
  }
  else{
    var online =0;
      localStorage.setItem("online", JSON.stringify(online));
    deferred.reject();
     $location.url('/401');
  }

  },function errorCallback(response){

  })
  ;

  return deferred.promise;
}



var checkAdminLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();
  $http.post('/admin/check').then(function successCallback(response){

  if(response.data.success){
      deferred.resolve();
  }
  else{
    deferred.reject();
    $location.url('/401');
  }

  },function errorCallback(response){

  })
  ;

  return deferred.promise;
}


var checkcorp = function($q, $timeout, $http, $location, $rootScope) {

  var deferred = $q.defer();
  var url = $location.path();
  var id ="";
  var type=0;

  var i=1;
  for(i; i<url.length;i++){
    if(url.charAt(i)=='/'){
      i++
      break
    }
  }

  for(i; i<url.length;i++){
    id+=url.charAt(i);
  }

  if(url === "/profile_corporate/"+id){
    type=1;
  }
  else if(url === "/profile_corporate_any/"+id){
    type=2;
  }


  var req2 = {
   method: 'POST',
   url: '/checkcorpfound',
   data: "id="+id,
   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }


  $http({
    method: 'POST',
    url: '/checkcorpfound',
    data: "id="+id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function(response){
      if(response.data.success==false){
        deferred.reject();
        $location.url('/404');
      }
      else{
        $http.post("/check_online").then(function successCallback(response){

            var y = response.data.online;

            if(type==1){
              if(y==0 || y==1){
              deferred.reject();
              $location.url('/profile_corporate_any/'+id);
              }
              else{

                var req = {
                 method: 'POST',
                 url: '/corporate/checkcorpin',
                 data: "id=" + id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }


                $http({
                  method: 'POST',
                  url: '/corporate/checkcorpin',
                  data: "id=" + id,
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    if(response.data.success==false){
                      deferred.reject();
                      $location.url('/profile_corporate_any/'+id);
                    }
                    else{
                      deferred.resolve();
                    }

                   console.log(response);
                   });

              }
            }
            else if(type==2){
              if(y==0 || y==1){
                deferred.resolve();
              }
              else{
                var req = {
                 method: 'POST',
                 url: '/corporate/checkcorpin',
                 data: "id=" + id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }


                $http({
                  method: 'POST',
                  url: '/corporate/checkcorpin',
                  data: "id=" + id,
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    if(response.data.success==false){
                      deferred.resolve();
                    }
                    else{
                      deferred.reject();
                      $location.url('/profile_corporate/'+id);
                    }

                   console.log(response);
                   });

              }
            }


          }, function errorCallback(response) {//needs handling



        })
      }

     console.log(response);
     });




  return deferred.promise;
}




var entservice = function($q, $timeout, $http, $location, $rootScope, $window) {
  var deferred = $q.defer();
  var url = $location.path();
  var id ="";
  var type=0;

  var i=1;
  for(i; i<url.length;i++){
    if(url.charAt(i)=='/'){
      i++
      break
    }
  }

  for(i; i<url.length;i++){
    id+=url.charAt(i);
  }



  if(url === "/entertainement_service_client/"+id){
    type=1;
  }
  else if(url === "/entertainement_service_visitor/"+id){
    type=2;
  }
  else if(url === "/entertainement_service/"+id){
    type=3;
  }


  var req = {
   method: 'POST',
   url: '/checkentfound',
   data:"id="+id,
   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }


  $http({
    method: 'POST',
    url: '/checkentfound',
    data:"id="+id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function(response){

    if(response.data.success==false){
      deferred.reject();
      $location.url('/404');
    }
    else{
      $http.post("/check_online").then(function successCallback(response){
          var y = response.data.online;


          if(type==1){

          if(y==0){
              deferred.reject();
            $location.url('/entertainement_service_visitor/'+id);
          }
          else if(y==2){

            var req = {
             method: 'POST',
             url: '/corporate/checkservice',
             data: "id=" + id,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }


            $http({
              method: 'POST',
              url: '/corporate/checkservice',
              data: "id=" + id,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(response){
                if(response.data.success==false){
                  deferred.reject();
                  $location.url('/entertainement_service_visitor/'+id);
                }
                else{
                  deferred.reject();
                  $location.url('/entertainement_service/'+id);
                }

               console.log(response);
               });

          }
          else{
            deferred.resolve();
          }
        }


        else if(type==2){

        if(y==1){
            deferred.reject();
          $location.url('/entertainement_service_client/'+id);
        }
        else if(y==2){


              var req = {
               method: 'POST',
               url: '/corporate/checkservice',
               data: "id=" + id,
               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              }


              $http({
                method: 'POST',
                url: '/corporate/checkservice',
                data: "id=" + id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              }).then(function(response){
                  if(response.data.success==false){
                    deferred.resolve();
                  }
                  else{
                    deferred.reject();
                    $location.url('/entertainement_service/'+id);
                  }

                 console.log(response);
                 });

        }
        else{
          deferred.resolve();
        }

      }


      else if(type==3){

      if(y==1){
          deferred.reject();
        $location.url('/entertainement_service_client/'+id);
      }
      else if(y==0){
          deferred.reject();
        $location.url('/entertainement_service_visitor/'+id);
      }
      else{


        var req = {
         method: 'POST',
         url: '/corporate/checkservice',
         data: "id=" + id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }


        $http({
          method: 'POST',
          url: '/corporate/checkservice',
          data: "id=" + id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response){
            if(response.data.success==false){
              deferred.reject();
              $location.url('/entertainement_service_visitor/'+id);
            }
            else{
              deferred.resolve();
            }

           console.log(response);
           });




      }
    }



        }, function errorCallback(response) {//needs handling



      })
    }

     console.log(response);
     });





  return deferred.promise;
}
