(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('fieldService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/field');
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/field', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/field/' + id);
        }

        return {
            save: _save,
            getAll: _getAll,
            delete: _delete
        };
    });
})();