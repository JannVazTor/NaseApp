(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function ($scope, $state, receptionService, producerService, cylinderService) {
        $scope.selectedRole = {};
        $scope.receptions = [];
        $scope.producers = [];
        $scope.savedSuccesfully = false;
        $scope.reception = receptionService.recep;

        $scope.redirectAddRemission = function (receptionId) {
            receptionService.recep.Id = receptionId;
            $state.go('remissionAdd');
        };

        $scope.redirectUpdate = function (reception) {
            receptionService.recep = reception;
            $state.go('receptionUpdate');
        };

        $scope.UpdateReception =function(){
            receptionService.update($scope.reception.Id,$scope.reception).then(function (response) {
                $scope.message = "El registro fue Actualizado  de manera exitosa."
                $state.go('receptionManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        }

        $scope.saveReception = function () {
            receptionService.save($scope.reception).then(function (response) {
                $scope.savedSuccesfully = true;
                $state.go('receptionManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        };
        $scope.confirmationDelete =  function(receptionId){
            swal({
            title: "Estas seguro?",
            text: "Tú eliminaras la recepcion: " + receptionId +"!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
            },
            function(){
                $scope.deleteReception(receptionId);
            });
            
        };
        $scope.deleteReception = function (receptionId) {
            receptionService.delete(receptionId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
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