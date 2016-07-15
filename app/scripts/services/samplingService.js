(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('samplingService', function ($http, apiPath, grillService) {
        var _sampling = {
            Id: grillService.id,
            DateCapture: "",
            SampleWeight: "",
            HumidityPercent: "",
            WalnutNumber: "",
            Performance: "",
            TotalWeightOfEdibleNuts: ""
        };

        var _isReceptionAdd = false;

        var _getAllGrills = function () {
            return $http.get(apiPath + 'api/sampling/grills');
        }
        var _getAllReceptions = function () {
            return $http.get(apiPath + 'api/sampling/receptions');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/sampling', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/sampling/' + id);
        }
        var _update = function (data) {
            return $http.put(apiPath + 'api/sampling', data);
        }
        return {
            sampling: _sampling,
            getAllGrills: _getAllGrills,
            save: _save,
            delete: _delete,
            update: _update,
            getAllReceptions: _getAllReceptions,
            isReceptionAdd: _isReceptionAdd
        };
    });
})();