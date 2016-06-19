(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('cylinderService',function($http, apiPath){
        var _getAll = function(){
            return $http.get(apiPath + 'api/cylinder/getAll');
        }

        var _save = function(data){
            return $http.post(apiPath + 'api/cylinder', data);
        }

        var _delete = function(id){
            return $http.delete(apiPath + 'api/cylinder/' + id);
        }
        return {
            getAll: _getAll,
            save: _save,
            delete: _delete
        };
    });
})();