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
  }).when('/forgot',{
    templateUrl: './templates/forgot.html',
    controller: 'ForgotController'
  });
}]);

routeModule.controller('ForgotController',function($scope){
  $scope.user= '';
});

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
  var comfirm = document.getElementById('comfirm');
  $scope.user = '';
  $scope.password = '';
  $scope.comfirm = '';
  $scope.isExist = function(){
    ajax({
      url:'http://localhost/users/isexist/',
      method:'get',
      data:{user:$scope.user},
      success:function(data){
        var user = document.getElementById('user');
        console.log(data.result);
        console.log(data.result == 'exist');
        if((JSON.parse(data).result == 'exist') || ($scope.user == '')){
          console.log('exist');
          user.style.borderColor='red';
        }else{
          console.log('no');
          user.style.borderColor='green';
        }
      }
    })
  };
  $scope.errorcomfirm = function(){
    console.log(event);
    if($scope.password == $scope.comfirm){
      comfirm.style.borderColor='green';
      // $scope.$event.target.style.borderColor='green';
    }else{
      // $scope.$event.target.style.borderColor='red';
      comfirm.style.borderColor= 'red';
    }
  };

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
