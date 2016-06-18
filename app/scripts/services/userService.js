(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('userService',function($http, apiPath){
        var _getAll = function () {
            return $http.get(apiPath + 'api/account/getAll');
        }
        return {
            getAll: _getAll
        };
    });
})();