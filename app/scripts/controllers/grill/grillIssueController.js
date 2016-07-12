(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillIssueController', function (toastr, $scope, grillService) {
        $scope.grillIssue = {
            Remission: "",
            DateCapture: "",
            Truck: "",
            Driver: "",
            Box: "",
            GrillIds: []
        };

        $scope.grills = [];
        $scope.issues = [];

        $scope.saveGrillIssue = function () {
            $scope.grillIssue.DateCapture = $('#grillIssueDate').val();
            $scope.grills.forEach(function (element) {
                if (element.Added) {
                    $scope.grillIssue.GrillIds.push(element.Id);
                }
            }, this);
            grillService.saveIssue($scope.grillIssue).then(function (response) {
                cleanObj();
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Added) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
                toastr.success('el registro se agrego correctamente.');
            }, function (response) {
                cleanObj();
                toastr.error('ocurrio un error y el registro no pudo ser agregado.');
            });
        };

        var GetAllGrills = function () {
            grillService.getAllCurrentInv().then(function (response) {
                $scope.grills = response.data;
                if (response.data.length !== 0) {
                    response.data.forEach(function (element) {
                        element.Added = false;
                    }, this);
                } else {
                    toastr.info('No hay parrillas para mostrar.');
                }
            }, function (response) {
                toastr.error('Ocurrio un error al intentar cargar las parrillas.');
            });
        };

        var GetAllIssues = function () {
            grillService.getAllIssues().then(function (response) {
                $scope.issues = response.data;
                if (response.data.length === 0) {
                    toastr.info('No hay salidas para mostrar.');
                }
            }, function (response) {
                toastr.error('Ocurrio un error al intentar cargar las salidas.');
            });
        };

        var cleanObj = function () {
            $scope.grillIssue = {
                Remission: "",
                DateCapture: "",
                Truck: "",
                Driver: "",
                Box: "",
                GrillsIds: []
            };
        };

        GetAllGrills();
        GetAllIssues();
    });
})();