(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('clearService',function(receptionAndGrillService, receptionService){
        
        var _clearReceptionAndGrillService = function(){
            receptionAndGrillService.IsGrillToReception = false;
            receptionAndGrillService.grillId = "";
        }
        var _clearReceptionService = function(){
            receptionService.receptionEntryId = "";
        }
        
        return{
            clearReceptionAndGrillService: _clearReceptionAndGrillService,
            clearReceptionService: _clearReceptionService
        }
    });
})();