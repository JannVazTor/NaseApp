(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('samplingService',function($http, apiPath, grillService){
        var _sampling = {
            Id: grillService.id,
            DateCapture: "",
            SampleWeight: "",
            HumidityPercent: "",
            WalnutNumber: "",
            Performance: "",
            TotalWeightOfEdibleNuts: ""
        };

        var _getAll = function () {
            return $http.get(apiPath + 'api/sampling/getAll');
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
            getAll: _getAll,
            save: _save,
            delete: _delete,
            update: _update
        };
    });
})();