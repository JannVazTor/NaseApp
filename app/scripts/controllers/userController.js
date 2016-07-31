(function () {
  'use strict'
  angular.module('naseNutAppApp').controller('userController', function (msgS, toastr, $scope, $state, authService, roleService, userService) {
    $scope.roles = [];
    $scope.users = [];
    $scope.registration = [];
    $scope.registration.Role = "";

    var GetAllUsers = function () {
      userService.getAll().then(function (response) {
        $scope.users = ReplaceRoleNames(response.data, 'Role');
      }, function (response) {
        msgS.msg('err', 3);
      });
    };

    var GetAllRoles = function () {
      roleService.getAll().then(function (response) {
        $scope.roles = ReplaceRoleNames(response.data, 'Name');
        $scope.registration.Role = $scope.roles[0];
      },
        function (response) {
          msgS.msg('err', 0);
        });
    };
    function ReplaceRoleNames(data, propertyName) {
      $.each(data, function (i) {
        if (data[i][propertyName] == 'admin') { data[i][propertyName] = 'Administrador' };
        if (data[i][propertyName] == 'grillUser') { data[i][propertyName] = 'Capturista de Parrillas' };
        if (data[i][propertyName] == 'humidityUser') { data[i][propertyName] = 'Capturista de Humedad' };
        if (data[i][propertyName] == 'qualityUser') { data[i][propertyName] = 'Capturista de Muestreos' };
        if (data[i][propertyName] == 'remRecepUser') { data[i][propertyName] = 'Capturista de Recepciones y Remisiones' };
      });
      return data;
    };

    $scope.signUp = function (user) {
      var User = {
        UserName: user.UserName,
        Password: user.Password,
        ConfirmPassword: user.ConfirmPassword,
        RoleId: user.Role.Id,
        Email: user.Email
      };
      if (User.RoleId === undefined){
        msgS.msg('err', 18);
      } else {
        authService.saveRegistration(User).then(function (response) {
          GetAllUsers();
          msgS.msg('succ', 1);
        },
          function (response) {
            msgS.msg('err', 1);
          });
      }
    };

    $scope.deleteUser = function (userId) {
      userService.delete(userId).then(function (response) {
        msgS.msg('succ', 0);
        $.each($scope.users, function (i) {
          if ($scope.users[i].Id === userId) {
            $scope.users.splice(i, 1);
            return false;
          }
        });
      }, function (response) {
        msgS.msg('err', 2);
      });
    };

    GetAllRoles();
    GetAllUsers();

  });
})();
