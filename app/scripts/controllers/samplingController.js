(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('samplingController',function($scope,toastr, $filter, $state, samplingService){
        $scope.message = "";
        $scope.samplings = [];
        $scope.sampling = samplingService.sampling;
        //$('#samplingDate').val($scope.sampling.DateCapture);
        $scope.saveSampling = function () {
            $scope.sampling.DateCapture = $('#samplingDate').val();
            samplingService.save($scope.sampling).then(function (response) {   
                $scope.savedSuccesfully = true;
                $state.go('samplingManage');
            }, function (response) {
                toastr.error('Ocurrio un error al intentar guardar el registro.');
            });
        };
        $scope.confirmationDelete = function (SamplingId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras el muestreo con id: " + SamplingId + "!!",
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
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.samplings, function (i) {
                    if ($scope.samplings[i].Id === SamplingId) {
                        $scope.samplings.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                toastr.error('Ocurrio un error al intentar eliminar el registro.');
            });
        };

         $scope.redirectUpdate = function (sampling) {
            samplingService.sampling = sampling;
            $state.go('samplingUpdate');
        };

        $scope.UpdateSampling= function () {
            $scope.sampling.DateCapture = $('#samplingDate').val();
            samplingService.update($scope.sampling).then(function (response) {
                toastr.success('El registro se actualizo de manera exitosa.');
                $state.go('samplingManage');
            }, function (response) {
               toastr.error('Ocurrio un error al intentar actualizar el registro.');
            });
        }

         var GetAllSamplings = function () {
            samplingService.getAll().then(function (response) {
                $scope.samplings = response.data;
            }, function (response) {
                toastr.error('La obtencion de muestreos fallo.');
            });
        };

        GetAllSamplings();
    });
})();