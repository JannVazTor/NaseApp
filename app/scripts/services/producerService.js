(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('producerService',function($http, apiPath){
        var _getAll = function(){
            return $http.get(apiPath + 'api/producer/getAll');
        }

        var _save = function(data){
            return $http.post(apiPath + 'api/producer', data);
        }
        
        return {
            save: _save,
            getAll: _getAll
        };
    });
})();