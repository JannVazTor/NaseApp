(function(){
'use strict'
  angular.module('naseNutAppApp')
    .controller('loginController',function($scope, $state, authService){
      $scope.loginData = {
        username: "",
        password: ""
      };
      $scope.isAuth = false;
      $scope.message = "";

      $scope.login = function(){
        authService.login($scope.loginData).then(function(response){
            $state.go('home');
            $scope.isAuth = true;
        },
      function(err){
        $scope.message = err.err_description;
      });
      };

      $scope.logout = function() {
        authService.logOut();
        $scope.isAuth = false;
        $state.go('login');
      }
    });
})();
