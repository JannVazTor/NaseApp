(function () {
  'use strict'
  angular.module('naseNutAppApp').factory('authService', function ($location, $rootScope, $state, $http, $q, apiPath, localStorageService, USER_ROLES) {
    var _authentication = {
      isAuth: false,
      userName: "",
      role: ""
    };

    var _saveRegistration = function (registration) {
      _logOut();
      return $http.post(apiPath + 'api/account/register', registration).then(function (response) {
        return response;
      });
    };

    var _isInRole = function (roleArray) {
      var InRole = false;
      $.each(roleArray, function (i) {
        if (roleArray[i] === _authentication.role) {
          InRole = true;
          return false;
        }
      });
      return InRole;
    }

    var _isLoggedIn = function () {
      return _authentication.isAuth;
    }

    var _login = function (loginData) {
      var data = 'grant_type=password&username=' + encodeURIComponent(loginData.username) + "&password=" + encodeURIComponent(loginData.password);
      var deferred = $q.defer();
      $http.post(apiPath + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
        var role = getRole(response.data.role);
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.username, role: role });
        _authentication.isAuth = true;
        _authentication.userName = loginData.username;
        _authentication.role = role;
        deferred.resolve(response);
      }, function (response) {
        _logOut();
        deferred.reject(response);
      });
      return deferred.promise;
    };

    var _logOut = function () {
      localStorageService.remove('authorizationData');
      _authentication.isAuth = false;
      _authentication.userName = "";
    };

    var _fillAuthData = function () {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        _authentication.isAuth = true;
        _authentication.userName = authData.userName;
        _authentication.role = authData.role;
      }
    };

    var getRole = function (role) {
      switch (role) {
        case '592690d4-f3ce-4e57-b2c8-78d0394b08bd': return USER_ROLES.admin;
        case '479627c7-12a3-4778-ab3f-1ec2bd048ce1': return USER_ROLES.humidityUser;
        case '4f76500a-ba89-47d5-8a48-ed4b880ada40': return USER_ROLES.remRecepUser;
        case 'cc74bc28-2050-4be5-8ca9-da71c55d1403': return USER_ROLES.qualityUser;
        case 'ba05c2a8-4c32-44af-a26a-a3eb9bd8240f': return USER_ROLES.grillUser;
        default: return '';
      }
    };

    return {
      saveRegistration: _saveRegistration,
      login: _login,
      logOut: _logOut,
      fillAuthData: _fillAuthData,
      authentication: _authentication,
      isInRole: _isInRole,
      isLoggedIn: _isLoggedIn
    };
  });
})();
