(function () {
  'use strict'
  angular.module('naseNutAppApp')
    .controller('loginController', function ($scope, $state, authService, msgS) {
      $scope.loginData = {
        username: "",
        password: ""
      };
      $scope.isAuth = false;

      $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
          $scope.isAuth = true;
          $state.go('home');
        },function (response) {
            msgS.msg('err', 4);
          });
      };

      $scope.logout = function () {
        authService.logOut();
        $scope.isAuth = false;
        $state.go('login');
      }
    });
})();
