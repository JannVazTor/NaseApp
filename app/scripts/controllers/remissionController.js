(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('remissionController', function ($scope, $state, remissionService, receptionService) {
        $scope.remissions = [];
        $scope.message = "";
        $scope.remission = {
            Cultivation: "",
            Batch: "",
            Quantity: "",
            Butler: "",
            TransportNumber: "",
            Driver: "",
            Elaborate: "",
            ReceptionId: receptionService.ProducerId
        };
        $scope.saveRemission = function () {
            remissionService.save($scope.remission).then(function (response) {
            }, function (response) {
                $scope.message = "ocurrio un error al intentar guardar el registro.";
            });
        };

        $scope.deleteRemission = function (remissionId) {
            remissionService.delete(remissionId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                $.each($scope.remissions, function (i) {
                    if ($scope.remissions[i].Id === remissionId) {
                        $scope.remissions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error al intentar eliminar el registro.";
            });
        };

        $scope.redirectToReception = function () {
            $state.go('receptionManage');
        };

        var GetAllRemissions = function () {
            remissionService.getAll().then(function (response) {
                $scope.remissions = response.data;
            }, function (response) {
                $scope.message = "ocurrio un error al intentar obtener los registros.";
            });
        };

        GetAllRemissions();
    });
})();