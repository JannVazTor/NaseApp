(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('humidityService', function (apiPath, $http) { 

        var _getAll = function () {
            return $http.get(apiPath + 'api/humidity').catch(function (e) {
                console.log("error description: ", e);
                throw e;
            });
        }

        var _getByReceptionEntry = function(id){
            return $http.get(apiPath + 'api/humidity/getByReceptionEntry/' + id);
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/humidity', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/humidity/' + id);
        }

        return {
            save: _save,
            getAll: _getAll,
            delete: _delete,
            getByReceptionEntry:_getByReceptionEntry
        };
    });
})();
