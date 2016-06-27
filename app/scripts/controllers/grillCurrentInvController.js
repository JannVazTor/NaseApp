(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillCurrentInvController', function ($scope, grillService) {
        $scope.message = "";
        $scope.grills = [];

        var GetAllGrills = function () {
            grillService.getAllCurrentInv().then(function (response) {
                $scope.grills = response.data;
            }, function (response) {
                $scope.message = "la obtencion de parrillas fallo.";
            });
        };
        GetAllGrills();
    });
})();