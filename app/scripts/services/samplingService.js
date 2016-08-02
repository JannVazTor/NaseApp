(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('samplingService', function ($http, apiPath, grillService) {
        var _sampling = {
            Id: grillService.id,
            DateCapture: "",
            SampleWeight: "",
            HumidityPercent: "",
            WalnutNumber: "",
            TotalWeightOfEdibleNuts: ""
        };
        var _getAllGrills = function () {
            return $http.get(apiPath + 'api/sampling/grills');
        }
        var _getAllReceptions = function () {
            return $http.get(apiPath + 'api/sampling/receptions');
        }
        var _saveToGrill = function (data) {
            return $http.post(apiPath + 'api/sampling/grill', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/sampling/' + id);
        }
        var _update = function (data) {
            return $http.put(apiPath + 'api/sampling', data);
        }
        var _saveToReceptionEntry = function (data) {
            return $http.post(apiPath + 'api/sampling/receptionEntry', data);
        }
        return {
            sampling: _sampling,
            getAllGrills: _getAllGrills,
            saveToGrill: _saveToGrill,
            delete: _delete,
            update: _update,
            getAllReceptions: _getAllReceptions,
            saveToReceptionEntry: _saveToReceptionEntry
        };
    });
})();