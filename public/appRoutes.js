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
        controller : ''
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
        controller : ''
    })


    .when('/profile_client', {
        templateUrl: 'views/profile_client.html',
        controller : 'profile_client'
    })

    .when('/forget_password', {
        templateUrl: 'views//forget_password.html',
        controller : ''
    })

    .when('/change_password', {
        templateUrl: 'views/change_password.html',
        controller : ''
    })


$locationProvider.html5Mode(true);

}]);
