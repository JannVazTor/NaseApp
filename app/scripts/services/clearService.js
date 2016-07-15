(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('clearService',function(receptionAndGrillService, samplingService){
        
        var _clearReceptionAndGrillService = function(){
            receptionAndGrillService.IsGrillToReception = false;
            receptionAndGrillService.grillId = "";
        }
        var _clearSamplingService = function(){
            samplingService.isReceptionAdd = false;
        }
        
        return{
            clearReceptionAndGrillService: _clearReceptionAndGrillService,
            clearSamplingService: _clearSamplingService
        }
    });
})();