(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('reportService',function($http, apiPath){
        var _getProducerReport = function(id){
            return $http.get(apiPath + 'api/report/producer/' + id);
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

        var _getDailyProcessReport = function(){
            return $http.get(apiPath + 'api/report/dailyProcess');
        }

        var _getGrillIssuesReport = function(){
            return $http.get(apiPath + 'api/report/grillIssues');
        }
        var _getReportOrigin = function(){
            return $http.get(apiPath + 'api/report/originReport');
        }
        var _getSecondCurrentInventory = function(){
            return $http.get(apiPath + 'api/report/secondCurrentInventoryGrills')
        }
        var _getSecondGrillIssuesReport = function(){
            return $http.get(apiPath + 'api/report/secondGrillIssues')
        }
        return {
            getProducerReport: _getProducerReport,
            getReportingProcess: _getReportingProcess,
            getCurrentInventoryReport: _getCurrentInventoryReport,
            getProcessInventory: _getProcessInventory,
            getDailyProcess: _getDailyProcessReport,
            getGrillIssuesReport: _getGrillIssuesReport,
            getReportOrigin: _getReportOrigin,
            getSecondCurrentInventory: _getSecondCurrentInventory,
            getSecondGrillIssuesReport: _getSecondGrillIssuesReport
        };
    });
})();