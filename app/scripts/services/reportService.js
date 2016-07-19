(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('reportService',function($http, apiPath){
        var _getProducerReport = function(id){
            return $http.get(apiPath + 'api/report/producer/' + id);
        }
        var _getReportingProcess = function(){
            return $http.get(apiPath + 'api/report/reportingProcess');
        }
        return {
            getProducerReport: _getProducerReport,
            getReportingProcess: _getReportingProcess
        };
    });
})();