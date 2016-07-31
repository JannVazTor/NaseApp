(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('userService', function ($http, apiPath, authService) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/account/getAll');
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/account/' + id);
        }

        var _isLoggedIn = function () {
            return authService.authentication.isAuth;
        }

        var _currentUserInfo = function () {
            return authService.authentication;
        }

        var _changePassword = function (data) {
            return $http.post(apiPath + 'api/account/changePassword', data);
        }

        return {
            getAll: _getAll,
            delete: _delete,
            isLoggedIn: _isLoggedIn,
            currentUserInfo: _currentUserInfo,
            changePassword: _changePassword
        };
    });
})();