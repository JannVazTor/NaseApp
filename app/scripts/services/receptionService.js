(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionService', function ($http, apiPath) {
        var _ProducerId = "";

        var _grillId = "";

        var _addGrillToReception = false;

        var _getAll = function () {
            return $http.get(apiPath + 'api/reception/getAll');
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/reception', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/reception/' + id);
        }

        var _addReceptionToGrill = function (receptionId, grillId) {
            return $http.put(apiPath + 'api/reception/addReceptionToGrill/'+ receptionId + '/' + grillId);
        }
        
        var _removeReceptionToGrill = function(){
            return $http.put();
        }

        return {
            ProducerId: _ProducerId,
            getAll: _getAll,
            save: _save,
            delete: _delete,
            addReceptionToGrill: _addReceptionToGrill,
            addGrillToReception: _addGrillToReception,
            grillId: _grillId,
            removeReceptionToGrill: _removeReceptionToGrill
        };
    });
})();