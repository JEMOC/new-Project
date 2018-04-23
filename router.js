//router.js

var routeModule = angular.module('routeModule',['ngRoute']);

routeModule.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.when('/login',{
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  }).when('/register',{
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
  }).otherwise({
    redirectTo:'/other'
  });
}]);
