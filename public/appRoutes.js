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
        templateUrl: 'views/corporates.html',
        controller : ''
    })

$locationProvider.html5Mode(true);

}]);
