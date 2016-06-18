(function () {
  'use strict'
  angular.module('naseNutAppApp').controller('userController', function ($scope, $state, authService, roleService, userService) {
    $scope.savedSuccessfully = false;
    $scope.selectedRole = $scope.roles;
    $scope.searchUser = "";
    $scope.message = "";
    $scope.roles = [];
    $scope.users = [];
    $scope.registration = {
      userName: "",
      password: "",
      confirmPassword: "",
      roleId: $scope.selectedRole 
    };
    
    userService.getAll().then(function (response) {
      $scope.users = response.data;
    }, function (response) {
      $scope.message = "la obtencion de usuarios fallo";
    });

    roleService.getAll().then(function (response) {
      $scope.roles = response.data;
    },
      function (response) {
        $scope.message = "La obtencion de roles fallo";
      });

    $scope.signUp = function () {
      authService.saveRegistration($scope.registration).then(function (response) {
        $scope.savedSuccessfully = true;
        $scope.message = "El usuario a sido registrado de manera exitosa, Seras redirigido a la pagina del login en 2 segundos..";
      },
        function (response) {
          var errors = [];
          for (var key in response.data.modelState) {
            for (var i = 0; i < response.data.modelState[key].length; i++) {
              errors - push(response.data.modelState[key][i]);
            }
          }
          $scope.message = "El registro fallo, detalles: " + errors.join(' ');
        });
    };
  });
})();
