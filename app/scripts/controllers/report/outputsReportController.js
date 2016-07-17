(function(){
    'use strict'
    angular.module('naseNutAppApp').controller('outputsReportController',function($scope, DTOptionsBuilder, DTColumnBuilder){
         $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap().withOption('responsive', true);
    });
})();