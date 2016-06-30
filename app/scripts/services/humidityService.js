(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('humidityService', function ($http, apiPath) {
        var _ReceptionId = "";

        var _getTotalHumidities = function(){
          return $http.get(apiPath + 'api/humidity/getAll')
        }

        var _getReceptionsByCylinder = function (id) {
            return $http.get(apiPath + 'api/reception/getReceptionsByCylinder' + '?' + 'CylinderId=' + id);
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/humidity', data);
        }

        var _delete = function(id){
            return $http.delete(apiPath + 'api/humidity/' + id);
        }

        return {
            ReceptionId : _ReceptionId,
            getTotalHumidities: _getTotalHumidities,
            getReceptionsByCylinder: _getReceptionsByCylinder,
            save: _save,
            delete: _delete
        };
    });
})();
