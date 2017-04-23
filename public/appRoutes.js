angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/home.html',
        controller : ''
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

    .when('/services', {
        templateUrl: 'views/entertainement_services.html',
        controller : 'getservices'
    })

    .when('/services_search', {
        templateUrl: 'views/entertainement_services_search.html',
        controller : 'viewSearch'
    })

    .when('/register_corporate', {
        templateUrl: 'views/register_corporate.html',
        controller : ''
    })

    .when('/login_corporate', {
        templateUrl: 'views/login_corporate.html',
        controller : ''
    })

    .when('/entertainement_service', {
        templateUrl: 'views/entertainement_service.html',
        controller : 'service_corporate',
        resolve: {
        logincheck: checkCorporateLoggedin
      }
    })

    .when('/entertainement_service_client', {
        templateUrl: 'views/entertainement_service_client.html',
        controller : 'serviceprofile',
        resolve: {
        logincheck: checkClientLoggedin
      }
    })

    .when('/entertainement_service_visitor', {
        templateUrl: 'views/entertainement_service_visitor.html',
        controller : 'serviceprofile'
    })


    .when('/profile_client', {
        templateUrl: 'views/profile_client.html',
        controller : 'profile_client',
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

    .when('/profile_corporate', {
        templateUrl: 'views/profile_corporate.html',
        controller : 'profile_corporate',
        resolve: {
        logincheck: checkCorporateLoggedin
      }
    })

    .when('/Admin_Views_CorporateRequests', {
        templateUrl: 'views/admin_Corporate_requests.html',
        controller : 'AORCorp'
    })

    .when('/corporates', {
        templateUrl: 'views/corporates.html',
        controller : 'getcorporates'
    })

    .when('/profile_corporate_any', {
        templateUrl: 'views/profile_corporate_any.html',
        controller : 'corporateprofile'
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
  $http.post('/client/checkAuthentication').then(function successCallback(response){

  if(response.data.success){
    var online =1;
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
