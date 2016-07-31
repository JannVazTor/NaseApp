(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('homeService',function(apiPath, $http, $q){
        var _getProductionVariety = function(){
            var deferred = $q.defer();
            $http.get(apiPath + 'api/homeDash/productionVariety').then(function(response){
                deferred.resolve(response);
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }
        return{
            getProductionVariety: _getProductionVariety
        };
    });
})();