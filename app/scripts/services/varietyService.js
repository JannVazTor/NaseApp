(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('varietyService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/variety');
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/variety', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/variety/' + id);
        }

        return {
            save: _save,
            getAll: _getAll,
            delete: _delete
        };
    });
})();