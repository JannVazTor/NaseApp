(function () {
    'use strict'
<<<<<<< HEAD
    angular.module('naseNutAppApp').factory('humidityService', function (apiPath, $http) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/humidity/getAll').catch(function (e) {
                console.log("error description: ", e);
                throw e;
            });
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/humidity', data);
        }

        var _delete = function (id) {
=======
    angular.module('naseNutAppApp').factory('humidityService', function ($http, apiPath) {
        var _ReceptionId = "";

        var _getTotalHumidities = function(){
          return $http.get(apiPath + 'api/humidity/getAll')
        }

        var _getReceptionsByCylinder = function (id) {
            return $http.get(apiPath + 'api/reception/getReceptionsByCylinder' + '?' + 'CylinderId=' + id);
        }

        var _getCylinderId = function(cylinderName){
            return $http.get(apiPath + 'api/cylinder/getIdByName' + '?' + 'CylinderName=' + cylinderName)
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/humidity/saveHumidity', data);
        }
 

        var _delete = function(id){
>>>>>>> origin/master
            return $http.delete(apiPath + 'api/humidity/' + id);
        }

        return {
<<<<<<< HEAD
            save: _save,
            getAll: _getAll,
            delete: _delete
        };
    });
})();
=======
            ReceptionId : _ReceptionId,
            getTotalHumidities: _getTotalHumidities,
            getReceptionsByCylinder: _getReceptionsByCylinder,
            getCylinderId: _getCylinderId,
            save: _save,
            delete: _delete
        };
    });
})();
>>>>>>> origin/master
