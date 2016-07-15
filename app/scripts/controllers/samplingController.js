(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('samplingController', function ($scope, toastr, $filter, $state, samplingService, clearService, receptionService) {
        $scope.message = "";
        $scope.samplings = [];
        $scope.receptionEntries = [];
        $scope.sampling = samplingService.sampling;

        $scope.saveSampling = function () {
            $scope.sampling.DateCapture = $('#samplingDate').val();
            samplingService.save($scope.sampling).then(function (response) {
                $scope.savedSuccesfully = true;
                $state.go('samplingManage');
            }, function (response) {
                toastr.error('Ocurrio un error al intentar guardar el registro.');
            });
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            clearService.clearSamplingService();
            onStateChange();
        });

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

        $scope.UpdateSampling = function () {
            $scope.sampling.DateCapture = $('#samplingDate').val();
            samplingService.update($scope.sampling).then(function (response) {
                toastr.success('El registro se actualizo de manera exitosa.');
                $state.go('samplingManage');
            }, function (response) {
                toastr.error('Ocurrio un error al intentar actualizar el registro.');
            });
        }

        var GetAllGrillSamplings = function () {
            samplingService.getAllGrills().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se encontraron muestreos en la base de datos.');
                } else {
                    $scope.samplings = response.data;
                }
            }, function (response) {
                toastr.error('Ocurrio un error y no se pudieron obtener los muestreos.');
            });
        };

        var GetAllReceptionSamplings = function () {
            samplingService.getAllReceptions().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se encontraron muestreos en la base de datos.');
                } else {
                    $scope.samplings = response.data;
                }
            }, function (response) {
                toastr.error('Ocurrio un error y no se pudieron obtener los muestreos.');
            });
        };
        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se encontraron recepciones en la base de datos.');
                } else {
                    $scope.receptionEntries = response.data;
                }
            }, function (response) {
                toastr.error('Ocurrio un error y no se puedieron obtener las recepciones.');
            });
        };

        $scope.redirectToAddSampling = function (receptionEntryId) {
            samplingService.isReceptionAdd = true;
            $state.go('samplingAdd');
        };

        (function () {
            switch ($state.current.name) {
                case 'samplingReceptionAdd':
                    GetAllReceptionEntries();
                    break;
                case 'samplingReceptionManage':
                    GetAllReceptionSamplings();
                    break;
                case 'samplingAdd':
                    break;
                case 'samplingGrillManage':
                    GetAllGrillSamplings();
                    break;
                default:
                    break;
            }
        })();
    });
})();