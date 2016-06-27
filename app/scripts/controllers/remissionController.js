(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('remissionController', function ($scope, $state, remissionService, receptionService) {
        $scope.remissions = [];
        $scope.message = "";
        $scope.folio = receptionService.reception.Folio;
        $scope.remission = remissionService.remission;
        
        $scope.saveRemission = function () {
            remissionService.save($scope.remission).then(function (response) {
                swal("Correcto","Se agrego correctmente","success");
                defaultRemission();
            }, function (response) {
                $scope.message = "ocurrio un error al intentar guardar el registro.";
            });
        };
        
         $scope.redirectUpdate = function (remission) {
            remissionService.remission = remission;
            $state.go('remissionUpdate');
        };

        $scope.UpdateRemission =function(){
            remissionService.update($scope.remission.Id,$scope.remission).then(function (response) {
                $scope.message = "El registro fue Actualizado  de manera exitosa."
                defaultRemission();
                $state.go('remissionManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        }

        $scope.confirmationDelete =  function(remissionId){
            swal({
            title: "Estas seguro?",
            text: "Tú eliminaras la remisión: " + remissionId +"!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
            },
            function(){
                $scope.deleteRemission(remissionId);
            });
            
        };
        $scope.deleteRemission = function (remissionId) {
            remissionService.delete(remissionId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
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

        function defaultRemission(){
            remissionService.remission.Id= "";
            remissionService.remission.Cultivation = "";
            remissionService.remission.Batch = "";
            remissionService.remission.Quantity = "";
            remissionService.remission.Butler = "";
            remissionService.remission.TransportNumber= "";
            remissionService.remission.Driver = "";
            remissionService.remission.Elaborate = "";
            remissionService.remission.ReceptionId = receptionService.reception.Id;
            $scope.remission = remissionService.remission;
        }

        GetAllRemissions();
    });
})();