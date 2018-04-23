//router.js

var routeModule = angular.module('routeModule',['ngRoute']);



function registertitle(){
  this.changetitle = function(){
    this.$emit('title','注册');
  };
}

routeModule.controller('app',function($scope){
    $scope.title='';
    $scope.logintitle = function() {
      $scope.title='登录';
    };
    $scope.registertitle = function (){
      $scope.title='注册';
    };

    $scope.$on('title',function(e,newTitle){
      $scope.title = newTitle;
    });

});

routeModule.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.when('/login',{
    templateUrl: './templates/login.html',
    controller: 'LoginController'
  })
  .when('/register',{
    templateUrl: './templates/register.html',
    controller: 'RegisterController'
  });
}]);

routeModule.controller('LoginController',function($scope){
  $scope.user = '';
  $scope.password = '';
  $scope.registertitle = function(){
    $scope.$emit('title','注册');
  };
  $scope.login = function(){
    ajax({
      type: 'post',
      url: 'http://localhost/users',
      data: {
        hello: 'world',
        ready: 'ok'
      }
    });
  }
});
routeModule.controller('RegisterController',function($scope){
  $scope.user = '';
  $scope.password = '';
  $scope.logintitle = function(){
    $scope.$emit('title','登录');
  };
  $scope.register = function(){
    ajax({
      type: 'get',
      url: 'http://localhost/users',
      data: {
        hello: 'world',
        ready: 'ok'
      },
      success: function(data) {
        console.log(data);
      }
    });
  }
})
