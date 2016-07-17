(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('samplingController', function ($scope, toastr, $filter, $state, samplingService, clearService, grillService, receptionService) {
        $scope.message = "";
        $scope.samplings = [];
        $scope.receptionEntries = [];
        $scope.sampling = samplingService.sampling;

        $scope.saveSampling = function (sampling) {
            var nutTypes = [{ NutType: 1, Kilos: sampling.kilosFirst, Sacks: sampling.sacksFirst },
                { NutType: 2, Kilos: sampling.kilosSecond, Sacks: sampling.sacksSecond },
                { NutType: 3, Kilos: sampling.kilosThird, Sacks: sampling.sacksThird }]
            var Sampling = {
                NutTypes: nutTypes,
                TotalWeightOfEdibleNuts: sampling.TotalWeightOfEdibleNuts,
                Performance: sampling.Performance,
                WalnutNumber: sampling.WalnutNumber,
                HumidityPercent: sampling.HumidityPercent,
                SampleWeight: sampling.SampleWeight,
                DateCapture: $('#samplingDate').val(),
                ReceptionEntryId: receptionService.receptionEntryId
            };
            if ($state.current.name === 'samplingReceptionEntryAdd') {
                if (ValidateNutTypes(Sampling.NutTypes)) {
                    samplingService.saveToReceptionEntry(Sampling).then(function (response) {
                        clearService.clearReceptionService();
                        $state.go('samplingReceptionAdd');
                    }, function (response) {
                        toastr.error('Ocurrio un error al intentar guardar el registro.');
                    });
                } else {
                    toastr.error('Se debe agregar al menos un tipo de nuez, sacos y kilos.');
                };
            } else {
                delete Sampling['NutTypes'];
                delete Sampling['ReceptionEntryId'];
                Sampling.GrillId = grillService.grillId;
                samplingService.saveToGrill(Sampling).then(function (response) {
                    $state.go('samplingGrillManage');
                }, function (response) {
                    toastr.error('Ocurrio un error al intentar guardar el registro.');
                });
            }
        };
        var ValidateNutTypes = function (nutTypes) {
            var counter = 0;
            $.each(nutTypes, function (i) {
                if (nutTypes[i].Kilos || nutTypes[i].Sacks) {
                    counter += 1;
                };
            });
            return counter >= 1;
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'samplingReceptionEntryAdd') {
                clearService.clearReceptionService();
                onStateChange();
            };
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
                    if ($scope.samplings.length !== 0) $scope.samplings = [];
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
                    if ($scope.samplings.length !== 0) $scope.samplings = [];
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
            receptionService.receptionEntryId = receptionEntryId;
            $state.go('samplingReceptionEntryAdd');
        };

        $scope.IsReceptionSamplingAdd = function () {
            return ($state.current.name === 'samplingReceptionEntryAdd');
        };

        (function () {
            switch ($state.current.name) {
                case 'samplingReceptionAdd':
                    GetAllReceptionEntries();
                    break;
                case 'samplingReceptionManage':
                    GetAllReceptionSamplings();
                    break;
                case 'samplingReceptionEntryAdd':
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