(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('roleService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/roles/getAll');
        }

        return {
            getAll: _getAll
        };
    });
})();