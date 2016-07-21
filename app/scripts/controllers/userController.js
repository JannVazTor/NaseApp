(function () {
  'use strict'
  angular.module('naseNutAppApp').controller('userController', function (msgS, toastr, $scope, $state, authService, roleService, userService) {
    $scope.roles = [];
    $scope.users = [];
    
    var GetAllUsers = function () {
      userService.getAll().then(function (response) {
        $scope.users = response.data;
      }, function (response) {
        msgS.msg('err', 3);
      });
    };

    var GetAllRoles = function () {
      roleService.getAll().then(function (response) {
        $scope.roles = response.data;
        $scope.registration.Role = $scope.roles[0];
      },
        function (response) {
          msgS.msg('err', 0);
        });
    };

    $scope.signUp = function (user) {
      var User = {
        UserName: user.UserName,
        Password: user.Password,
        ConfirmPassword: user.ConfirmPassword,
        RoleId: user.Role.RoleId,
        Email: user.Email
      };
      authService.saveRegistration(User).then(function (response) {
        GetAllUsers();
        msgS.msg('succ', 1);
      },
        function (response) {
          msgS.msg('err', 1);
        });
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
