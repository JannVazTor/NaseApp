(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('samplingController', function (msgS, $scope, $filter, $state, samplingService, clearService, grillService, receptionService, $rootScope) {
        $scope.message = "";
        $scope.samplings = [];
        $scope.receptionEntries = [];
        $scope.sampling = samplingService.sampling;

        $scope.CalculatePerformance = function () {
            if ($scope.sampling.SampleWeight !== 0 && $scope.sampling.SampleWeight > 0) {
                $scope.sampling.Performance = ($scope.sampling.TotalWeightOfEdibleNuts / $scope.sampling.SampleWeight) * 100;
            }
        };

        $scope.saveSampling = function (sampling) {
            var nutTypes = [{ NutType: 1, Kilos: sampling.kilosFirst, Sacks: sampling.sacksFirst },
                { NutType: 2, Kilos: sampling.kilosSecond, Sacks: sampling.sacksSecond },
                { NutType: 3, Kilos: sampling.kilosThird, Sacks: sampling.sacksThird }]
            var Sampling = {
                NutTypes: nutTypes,
                TotalWeightOfEdibleNuts: sampling.TotalWeightOfEdibleNuts,
                WalnutNumber: sampling.WalnutNumber,
                HumidityPercent: sampling.HumidityPercent,
                SampleWeight: sampling.SampleWeight,
                Performance: sampling.Performance,
                DateCapture: $('#EntryDate').val(),
                ReceptionEntryId: receptionService.receptionEntryId
            };
            if ($state.current.name === 'samplingReceptionEntryAdd') {
                if (ValidateNutTypes(Sampling.NutTypes)) {
                    samplingService.saveToReceptionEntry(Sampling).then(function (response) {
                        clearService.clearReceptionService();
                        msgS.msg('succ', 11);
                        $state.go('samplingReceptionAdd');
                    }, function (response) {
                        msgS.toastMessage(msgS.errorMessages[3], 3);;
                    });
                } else {
                    msgS.toastMessage(msgS.errorMessages[14], 3);;
                };
            } else {
                delete Sampling['NutTypes'];
                delete Sampling['ReceptionEntryId'];
                Sampling.GrillId = grillService.grillId;
                samplingService.saveToGrill(Sampling).then(function (response) {
                    $state.go('samplingGrillManage');
                }, function (response) {
                    msgS.toastMessage(msgS.errorMessages[3], 3);
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
            clearService.clearSamplingService();
        });

        $scope.confirmationDeleteReception = function (folio) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar el resultado de proceso con el folio " + folio + "?"),
                function () {
                    deleteSampling(samplingId);
                });
        };

        $scope.confirmationDeleteGrill = function (grillId) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar el muestreo de la parrilla numero " + grillId + "?"),
                function () {
                    deleteSampling(samplingId);
                });
        };

        var deleteSampling = function (SamplingId) {
            samplingService.delete(SamplingId).then(function (response) {
                $.each($scope.samplings, function (i) {
                    if ($scope.samplings[i].Id === SamplingId) {
                        $scope.samplings.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
            });
        };

        $scope.redirectUpdate = function (sampling) {
            samplingService.sampling = sampling;
            $state.go('samplingUpdate');
        };

        $scope.UpdateSampling = function () {
            $scope.sampling.DateCapture = $('#EntryDate').val();
            samplingService.update($scope.sampling).then(function (response) {
                msgS.toastMessage(msgS.successMessages[1], 2);;
                $state.go($rootScope.prevState);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[9], 3);
            });
        }

        var GetAllGrillSamplings = function () {
            samplingService.getAllGrills().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[11], 1);
                } else {
                    if ($scope.samplings.length !== 0) $scope.samplings = [];
                    $scope.samplings = response.data;
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[13], 3);
            });
        };

        var GetAllReceptionSamplings = function () {
            samplingService.getAllReceptions().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[11], 1);
                } else {
                    if ($scope.samplings.length !== 0) $scope.samplings = [];
                    $scope.samplings = response.data;
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[13], 3);
            });
        };
        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[6], 1);
                } else {
                    $scope.receptionEntries = response.data;
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[7], 3);
            });
        };

        $scope.redirectToAddSampling = function (receptionEntryId) {
            receptionService.receptionEntryId = receptionEntryId;
            $state.go('samplingReceptionEntryAdd');
        };

        $scope.IsReceptionSamplingAdd = function () {
            return ($state.current.name === 'samplingReceptionEntryAdd');
        };

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
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
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    break;
                case 'samplingGrillManage':
                    GetAllGrillSamplings();
                    break;
                case 'samplingAdd':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    break;
                case 'samplingUpdate':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    break;
                default:
                    break;
            }
        })();
    });
})();