(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionAndGrillService', function (apiPath, $http) {
        
        var _grillId = "";

        var _receptionId = "";

        var _IsGrillToReception = false;

        var _receptionFolio = "";

        var _addReceptionToGrill = function (receptionId, grillId) {
            return $http.put(apiPath + 'api/reception/addReceptionToGrill/' + receptionId + '/' + grillId);
        }

        var _removeReceptionToGrill = function (receptionId, grillId) {
            return $http.put(apiPath + 'api/reception/removeReceptionToGrill/' + receptionId + '/' + grillId);
        }
        
        var _addGrillToReception = function(grillId, receptionId){
            return $http.put(apiPath + 'api/grill/addGrillToReception/' + grillId + '/' + receptionId);
        }

        var _removeGrillToReception = function(grillId, receptionId){
            return $http.put(apiPath + 'api/grill/removeGrillToReception/' + grillId + '/' + receptionId)
        }

        return{
            grillId: _grillId,
            receptionId: _receptionId,
            IsGrillToReception: _IsGrillToReception,
            addReceptionToGrill: _addReceptionToGrill,
            removeReceptionToGrill: _removeReceptionToGrill,
            addGrillToReception: _addGrillToReception,
            removeGrillToReception: _removeGrillToReception,
            receptionFolio: _receptionFolio
        };
    });
})();