(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('clearService',function(receptionAndGrillService){
        
        var _clearReceptionAndGrillService = function(){
            receptionAndGrillService.IsGrillToReception = false;
            receptionAndGrillService.grillId = "";
        }
        
        return{
            clearReceptionAndGrillService: _clearReceptionAndGrillService
        }
    });
})();