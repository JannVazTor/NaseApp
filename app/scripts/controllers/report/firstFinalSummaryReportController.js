(function(){
    'use strict'
    angular.module('naseNutAppApp').controller('firstFinalSummaryReportController',function($scope, $state, DTOptionsBuilder, DTColumnBuilder){
        
        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap().withOption('responsive', true);
        
    });
})();