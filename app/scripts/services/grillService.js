(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('grillService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/grill/getAll');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/grill', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/grill/' + id);
        }
        return {
            getAll: _getAll,
            save: _save,
            delete: _delete
        };
    });
})();