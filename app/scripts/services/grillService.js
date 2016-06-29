(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('grillService', function ($http, apiPath) {
        var _Id = "";
        var _grill = {
            DateCapture: "",
            Size: "",
            Sacks: "",
            Kilos: "",
            Quality: "",
            Variety: "",
            Producer: "",
            FieldName: ""
        };
        var _getAll = function () {
            return $http.get(apiPath + 'api/grill/getAll');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/grill', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/grill/' + id);
        }
        var _update = function (id, data) {
            return $http.put(apiPath + 'api/grill/' + id, data);
        }

        return {
            id: _Id,
            grill: _grill,
            getAll: _getAll,
            save: _save,
            delete: _delete,
            update: _update
        };
    });
})();