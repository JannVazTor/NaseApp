(function () {
  'use strict'
  angular.module('naseNutAppApp').controller('userController', function (msgS, toastr, $scope, $state, authService, roleService, userService) {
    $scope.roles = [];
    $scope.users = [];
    $scope.registration = [];
    $scope.registration.Role = "";
    $scope.passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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
      if (User.RoleId === undefined) {
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

    var GetCurrentUser = function () {
      var userInfo = angular.copy(authService.authentication);
      switch (userInfo.role) {
        case 'admin':
          userInfo.role = 'Administrador';
          break;
        case 'grillUser':
          userInfo.role = 'Capturista de Parrillas';
          break;
        case 'humidityUser':
          userInfo.role = 'Capturista de Humedad';
          break;
        case 'qualityUser':
          userInfo.role = 'Capturista de Muestreos';
          break;
        case 'remRecepUser':
          userInfo.role = 'Capturista de Recepciones y Remisiones';
          break;
        default:
          break;
      }
      $scope.userInf = userInfo;
    };

    $scope.confirmDeleteUser = function (userId, userName) {
      swal(msgS.swalConfig("¿Esta seguro que desea eliminar al usuario " + userName + "?"),
        function () {
          $scope.deleteUser(userId);
        });
    };

    var deleteUser = function (userId) {
      userService.delete(userId).then(function (response) {
        $.each($scope.users, function (i) {
          if ($scope.users[i].Id === userId) {
            $scope.users.splice(i, 1);
            return false;
          }
        });
        msgS.swalSuccess();
      }, function (response) {
        msgS.msg('err', 2);
      });
    };

    $scope.changePass = function (changePass) {
      var ChangePassword = {
        OldPassword: changePass.OldPassword,
        NewPassword: changePass.NewPassword,
        ConfirmPassword: changePass.ConfirmPassword
      };
      userService.changePassword(ChangePassword).then(function () {
        msgS.msg('succ', 4);
      }, function () {
        msgS.msg('err', 21);
      });
    };

    (function () {
      switch ($state.current.name) {
        case 'userProfile':
          GetCurrentUser();
          break;
        case 'users':
          GetAllRoles();
          GetAllUsers();
          break;
        default:
          break;
      };
    })();
  });
})();
