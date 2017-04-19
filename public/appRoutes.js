angular.module('appRoutes', []).config(['$routeProvider'
//, '$locationProvider'
, function($routeProvider
//, $locationProvider
) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
        })

        .when('/about', {
            templateUrl: 'views/about.html',
        })

        .when('/login', {
            templateUrl: 'views/login.html',
        })

        .when('/register', {
            templateUrl: 'views/register.html',
        })

        .when('/services', {
            templateUrl: 'views/services.html',
        });

   // $locationProvider.html5Mode(true);

}]);