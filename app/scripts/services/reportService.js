(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('reportService',function($http, apiPath){
        var _getProducerReport = function(id){
            return $http.get(apiPath + 'api/producer/' + id);
        }
        var _getReportingProcess = function () {
            return $http.get(apiPath + 'api/report/reportingProcess');
        }
        var _getCurrentInventoryReport = function () {
            return $http.get(apiPath + 'api/report/currentInventoryGrills');
        }
        var _getProcessInventory = function(){
            return $http.get(apiPath + 'api/report/processInventory');
        }

        return {
            getProducerReport: _getProducerReport,
            getReportingProcess: _getReportingProcess,
            getCurrentInventoryReport: _getCurrentInventoryReport,
            getProcessInventory: _getProcessInventory
        };
    });
})();