(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('producerController', function ($scope, producerService) {
        $scope.producers = [];
        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.producer = {
            producerName: ""
        };

        var GetAll = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                $scope.message = "la obtencion de productores fallo";
            });
        };

        $scope.saveProducer = function () {
            producerService.save($scope.producer).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "El productor a sigo guardado de manera exitosa."
                GetAll();
            }, function (response) {
                $scope.message = "No se pudo guardar el productor";
            });
        };

        $scope.deleteProducer = function (producerId) {
            producerService.delete(producerId).then(function (response) {
                $scope.message = "El registro se borro de manera exitosa."
                $.each($scope.producers, function (i) {
                    if ($scope.producers[i].Id === producerId) {
                        $scope.producers.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error y el registro no pudo se eliminado.";
            });
        };

        GetAll();
    });
})();