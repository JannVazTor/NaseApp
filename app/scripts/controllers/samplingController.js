(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('samplingController',function($scope, $filter, $state, samplingService){
        $scope.message = "";
        $scope.samplings = [];
        $scope.sampling = samplingService.sampling;
        $('#samplingDate').val($scope.sampling.DateCapture);
        $scope.saveSampling = function () {
            $scope.sampling.DateCapture = $('#samplingDate').val();
            samplingService.save($scope.sampling).then(function (response) {   
                $scope.savedSuccesfully = true;
                $state.go('samplingManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        };
        $scope.confirmationDelete = function (SamplingId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras la recepcion: " + SamplingId + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminarlo!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteSampling(SamplingId);
                });

        };

        $scope.deleteSampling = function (SamplingId) {
            samplingService.delete(SamplingId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.samplings, function (i) {
                    if ($scope.samplings[i].Id === SamplingId) {
                        $scope.samplings.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error al intentar eliminar el registro.";
            });
        };

         $scope.redirectUpdate = function (sampling) {
            samplingService.sampling = sampling;
            $state.go('samplingUpdate');
        };

        $scope.UpdateSampling= function () {
            $scope.sampling.DateCapture = $('#samplingDate').val();
            samplingService.update($scope.sampling).then(function (response) {
                $scope.message = "El registro fue Actualizado  de manera exitosa."
                $state.go('samplingManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        }

         var GetAllSamplings = function () {
            samplingService.getAll().then(function (response) {
                $scope.samplings = response.data;
            }, function (response) {
                $scope.message = "la obtencion de los muestreos fallo";
            });
        };

        GetAllSamplings();
    });
})();