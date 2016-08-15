(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('processResultService', function($http, apiPath){
        var _saveNutTypes = function(data){
            return $http.post(apiPath + 'api/processResult', data);
        }
        return{
            saveNutTypes: _saveNutTypes
        };
    });
})();