(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('producerController', function ($scope, producerService) {
        $scope.producers = [];
        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.producer = {
            producerName: ""
        };

        $scope.save = function () {
            producerService.save($scope.producer).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "El productor a sigo guardado de manera exitosa."
            }, function (response) {
                $scope.message = "No se pudo guardar el productor";
            });
        };

        producerService.getAll().then(function (response) {
            $scope.producers = response.data;
        }, function (response) {
            $scope.message = "la obtencion de productores fallo";
        });
    });
})();