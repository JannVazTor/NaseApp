(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('mainController', function ($scope, userService, USER_ROLES, AUTH_EVENTS, $state, authService) {
        $scope.currentUser = userService.currentUserInfo();

        $scope.userRoles = USER_ROLES;

        $scope.logOut = function () {
            authService.logOut();
            $state.go('login');
        };

        $scope.isLoggedIn = function () {
            return userService.isLoggedIn();
        };

        $scope.$on(AUTH_EVENTS.notAuthorized, function () {
            $state.go('accessDenied');
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $state.go('login');
        });

        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $state.go('login');
        });
    });
})();
