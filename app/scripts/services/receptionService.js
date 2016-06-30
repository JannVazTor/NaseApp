(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionService', function ($http, apiPath) {
        var _ReceptionId = "";
        var _CylinderId = "";

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
            ReceptionId: _ReceptionId,
            CylinderId: _CylinderId,
            getAll: _getAll,
            save: _save,
            delete: _delete
        };
    });
})();
