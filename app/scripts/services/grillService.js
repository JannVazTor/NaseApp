(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('grillService', function ($http, apiPath) {
        
        var _getAll = function () {
            return $http.get(apiPath + 'api/grill/getAll');
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/grill', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/grill/' + id);
        }

        var _changeStatus = function(id ,status){
            return $http.put(apiPath + 'api/grill/changeStatus/' + id + '/' + status);
        }

        var _getAllCurrentInv = function(){
            return $http.get(apiPath + 'api/grill/getAllCurrentInv');
        }

        return {
            getAll: _getAll,
            save: _save,
            delete: _delete,
            changeStatus: _changeStatus,
            getAllCurrentInv: _getAllCurrentInv
        };
    });
})();