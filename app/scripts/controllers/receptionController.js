(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function ($scope, $state, receptionService, producerService, cylinderService) {
        $scope.selectedRole = {};
        $scope.receptions = [];
        $scope.producers = [];
        $scope.savedSuccesfully = false;
        $scope.reception = {
            Variety: "",
            ReceivedFromField: "",
            CylinderId: "",
            FieldName: "",
            CarRegistration: "",
            HeatHoursDrying: "",
            HumidityPercent: "",
            Observations: "",
            ProducerId: "",
        };

        $scope.redirectAddRemission = function (receptionId) {
            remissionService.setProducerId = $scope.reception.ProducerId;
            $state.go('remissionAdd');
        };

        $scope.saveReception = function () {
            receptionService.save($scope.reception).then(function (response) {
                $scope.savedSuccesfully = true;
                $state.go('receptionManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        };

        $scope.deleteReception = function (receptionId) {
            receptionService.delete(receptionId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error al intentar eliminar el registro.";
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                $scope.message = "la obtencion de productores fallo.";
            });
        };

        var GetAllCylinders = function () {
            cylinderService.getAll().then(function (response) {
                $scope.cylinders = response.data;
            }, function (response) {
                $scope.message = "la obtencion de cilindros fallo.";
            });
        };

        var GetAllReceptions = function () {
            receptionService.getAll().then(function (response) {
                $scope.receptions = response.data;
            }, function (response) {
                $scope.message = "la obtencion de las recepciones fallo";
            });
        };

        GetAllReceptions();
        GetAllProducers();
        GetAllCylinders();
    });
})();