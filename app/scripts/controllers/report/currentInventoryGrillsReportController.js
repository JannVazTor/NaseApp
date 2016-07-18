(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('currentInventoryGrillsReportController', function ($scope, $state, DTOptionsBuilder, DTColumnBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap().withOption('responsive', true);

    });
})();