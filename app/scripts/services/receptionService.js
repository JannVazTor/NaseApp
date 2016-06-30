(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionService', function ($http, apiPath) {
        var _ProducerId = "";

        var _getAll = function () {
            return $http.get(apiPath + 'api/reception/getAll');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/reception', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/reception/' + id);
        }

        return {
            ProducerId: _ProducerId,
            getAll: _getAll,
            save: _save,
            delete: _delete
        };
    });
})();
