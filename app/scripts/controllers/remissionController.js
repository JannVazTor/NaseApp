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
            ReceptionId: receptionService.getProducerId
        };
        $scope.saveRemission = function(){
            remissionService.save().then(function(response){

            },function(response){
                $scope.message = "ocurrio un error al intentar guardar el registro.";
            });
        };

        $scope.redirectToReception = function(){
            $state.go('receptionManage');
        };

        var GetAllRemissions = function(){
            remissionService.getAll().then(function(response){
                $scope.remissions = response.data;
            },function(response){
                $scope.message = "ocurrio un error al intentar obtener los registros.";
            });
        };

        GetAllRemissions();
    });
})();