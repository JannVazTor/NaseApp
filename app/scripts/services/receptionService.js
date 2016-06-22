(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionService', function ($http, apiPath) {
        var _ProducerId = "";
        var _reception = {
            ID : "",
            Variety: "",
            ReceivedFromField: "",
            CylinderId: "",
            FieldName: "",
            CarRegistration: "",
            HeatHoursDrying: "",
            HumidityPercent: "",
            Observations: "",
            ProducerId: "",
        };
   
        var _getAll = function () {
            return $http.get(apiPath + 'api/reception/getAll');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/reception', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/reception/' + id);
        }
        var _update = function (id, data) {
            return $http.put(apiPath + 'api/reception/'+id, data);
        }
        
        return {
            ProducerId: _ProducerId,
            recep: _reception,
            getAll: _getAll,
            save: _save,
            delete: _delete,
            update: _update
        };
    });
})();