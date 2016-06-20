(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('remissionService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/remission/getAll');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/remission', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/remission/' + id);
        }
        return {
            getAll: _getAll,
            save: _save,
            delete: _delete
        };
    });
})();