(function () {
  'use strict'
  angular.module('naseNutAppApp').factory('authService', function ($http, $q, apiPath, localStorageService, accesslvl) {
    var _authentication = {
      isAuth: false,
      userName: ""
    };

    var _saveRegistration = function (registration) {
      _logOut();

      return $http.post(apiPath + 'api/account/register', registration).then(function (response) {
        return response;
      });
    };

    var _login = function (loginData) {
      var data = 'grant_type=password&username=' + encodeURIComponent(loginData.username) + "&password=" + encodeURIComponent(loginData.password);
      var deferred = $q.defer();

      $http.post(apiPath + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
        var role = getRole(response.role);
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, role: role });
        _authentication.isAuth = true;
        _authentication.userName = loginData.userName;
        deferred.resolve(response);

      }).error(function (err, status) {

        _logOut();
        deferred.reject(err);

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
      }
    };

    var getRole = function (role) {
      switch (role) {
        case 'admin': return accesslvl.admin;
        case 'humidityUser': return accesslvl.humidityUser;
        case 'remRecepUser': return accesslvl.remRecepUser;
        case 'qualityUser': return accesslvl.qualityUser;
        case 'grillUser': return accesslvl.grillUser;
        default: return accesslvl.public;
      }
    };

    return {
      saveRegistration: _saveRegistration,
      login: _login,
      logOut: _logOut,
      fillAuthData: _fillAuthData,
      authentication: _authentication
    };
  });
})();
