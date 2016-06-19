(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('userService',function($http, apiPath){
        var _getAll = function () {
            return $http.get(apiPath + 'api/account/getAll');
        }
        var _delete = function(id){
            return $http.delete(apiPath + 'api/account/' + id);
        }
        return {
            getAll: _getAll,
            delete: _delete
        };
    });
})();