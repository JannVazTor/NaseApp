(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillCurrentInvController', function ($scope,messageService,grillService, DTOptionsBuilder, DTColumnBuilder) {
        $scope.message = "";
        $scope.grills = [];

        var GetAllGrills = function () {
            grillService.getAllCurrentInv().then(function (response) {
                $scope.grills = response.data;
            }, function (response) {
                messageService.toastMessage(messageService.errorMessage[15],3);
            });
        };

        GetAllGrills();

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(grillService.getAllCurrentInv())
            .withDOM('frtip')
            .withPaginationType('full_numbers')
            .withButtons([
                'copy',
                'excel',
                'pdf',
                'csv',
                'print'
            ]);
    });
})();