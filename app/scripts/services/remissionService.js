(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('remissionService', function ($http, apiPath, receptionService) {
        var _remission = {
            Id: "",
            Quantity: "",
            Butler: "",
            TransportNumber: "",
            Driver: "",
            Elaborate: ""
        };

        var _getAll = function () {
            return $http.get(apiPath + 'api/remission/getAll');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/remission', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/remission/' + id);
        }
        var _update = function (id, data) {
            return $http.put(apiPath + 'api/remission/' + id, data);
        }
        return {
            remission: _remission,
            getAll: _getAll,
            save: _save,
            delete: _delete,
            update: _update
        };
    });
})();