(function(){
    'use strict'
    angular.module('naseNutAppApp').factory('homeService',function(apiPath, $http, $q){
        var _getProductionVariety = function(){
            return $http.get(apiPath + 'api/homeDash/productionVariety');
        }

        var _grillIssuesAndInventory = function(){
            return $http.get(apiPath + 'api/homeDash/grillIssuesAndInventory');
        }

        var _cylinderOccupiedHours = function(){
            return $http.get(apiPath + 'api/homeDash/cylinderOccupiedHours');
        }

        var _averageNumberOfNuts = function(){
            return $http.get(apiPath + 'api/homeDash/averageNumberOfNuts');
        }

        return{
            getProductionVariety: _getProductionVariety,
            grillIssuesAndInventory: _grillIssuesAndInventory,
            cylinderOccupiedHours: _cylinderOccupiedHours,
            averageNumberOfNuts: _averageNumberOfNuts
        };
    });
})();