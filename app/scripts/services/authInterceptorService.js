(function () {
  'use strict'
  angular.module('naseNutAppApp').factory('authInterceptorService', function ($q, $location, localStorageService, AUTH_EVENTS, $rootScope) {
    var _request = function (config) {
      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') { return config; }
      config.headers = config.headers || {};
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        config.headers.Authorization = 'Bearer ' + authData.token;
      }
      return config;
    };

    /*var _responseError = function (rejection) {
      if (rejection.status === 401) {
        $location.path('/login');
      }
      return $q.reject(rejection);
    };*/

     var _responseError = function (response) { 
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }

    return {
      request: _request,
      responseError: _responseError
    };
  });
})();


