(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('reportService',function($http, apiPath){
        var _getProducerReport = function(id){
            return $http.get(apiPath + 'api/producer/' + id);
        }
        var _getSacksPerVariety = function(){
            return $http.get(apiPath + 'api/report/');
        }
        return {
            getProducerReport: _getProducerReport,
            getSacksPerVariety: _getSacksPerVariety
        };
    });
})();