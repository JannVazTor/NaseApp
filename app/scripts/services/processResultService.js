(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('processResultService', function($http, apiPath){
        var _saveNutTypes = function(data){
            return $http.post(apiPath + 'api/processResult', data);
        }
        var _delete = function(id){
            return $http.delete(apiPath + 'api/sampling/processResult/' + id);
        }
        var _update = function(data){
            return $http.put(apiPath + 'api/sampling/processResult', data);
        }
        return{
            saveNutTypes: _saveNutTypes,
            delete: _delete,
            update: _update
        };
    });
})();