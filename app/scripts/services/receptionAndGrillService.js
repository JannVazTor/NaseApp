(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionAndGrillService', function (apiPath, $http) {
        
        var _grillId = "";

        var _addGrillToReception = false;

        var _addReceptionToGrill = function (receptionId, grillId) {
            return $http.put(apiPath + 'api/reception/addReceptionToGrill/' + receptionId + '/' + grillId);
        }

        var _removeReceptionToGrill = function () {
            return $http.put(apiPath + '');
        }
        
        return{
            grillId: _grillId,
            addGrillToReception: _addGrillToReception,
            addReceptionToGrill: _addReceptionToGrill,
            removeReceptionToGrill: _removeReceptionToGrill
        };
    });
})();