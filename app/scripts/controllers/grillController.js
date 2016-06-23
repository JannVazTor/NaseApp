(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillController', function ($scope, producerService, grillService) {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.grills = [];
        $scope.grill = {
            DateCapture: "",
            Size: "",
            Sacks: "",
            Kilos: "",
            Quality: "",
            Variety: "",
            Producer: "",
            FieldName: ""
        };
        $scope.saveGrill = function () {
            grillService.save($scope.grill).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "La parrilla a sido guardada de manera exitosa";
            }, function (response) {
                $scope.message = "No se pudo guardar el registro";
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                $scope.message = "la obtencion de productores fallo.";
            });
        };

        var GetAllGrills = function(){
            grillService.getAll().then(function(response){
                $scope.grills = response.data;
            },function(response){
                $scope.message = "la obtencion de parrillas fallo.";
            });
        }

        GetAllGrills();
        GetAllProducers();
    });
})();