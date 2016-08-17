(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('processResultController', function (clearService, processResultService, $rootScope, msgS, $filter, $scope, $state, samplingService, receptionService) {

        $scope.confirmationDeleteReception = function (id ,folio) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar el resultado de proceso con el folio " + folio + "?"),
                function () {
                    deleteSampling(id);
                });
        };

        $scope.redirectUpdate = function (sampling) {
            samplingService.sampling = sampling;
            $state.go('samplingUpdate');
        };

        $scope.redirectAddSampling = function (receptionEntryId) {
            receptionService.receptionEntryId = receptionEntryId;
            $state.go('processResultSampling');
        };

        $scope.redirectAddProcessResult = function (receptionEntryId, folios) {
            receptionService.receptionEntryId = receptionEntryId;
            receptionService.folio = folios;
            $state.go('processResult');
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'processResultSampling' && $state.current.name !== 'processResult') {
                clearService.clearReceptionService();
                onStateChange();
            };
            clearService.clearSamplingService();
        });

        var ValidateNutTypes = function (nutTypes) {
            var counter = 0;
            $.each(nutTypes, function (i) {
                if (nutTypes[i].Kilos || nutTypes[i].Sacks) {
                    counter += 1;
                };
            });
            return counter >= 1;
        };

        $scope.CalculatePerformance = function () {
            if ($scope.sampling.SampleWeight !== 0 && $scope.sampling.SampleWeight > 0) {
                $scope.sampling.Performance = Math.round((($scope.sampling.TotalWeightOfEdibleNuts / $scope.sampling.SampleWeight) * 100) * 100) / 100;
            }
        };

        $scope.saveProcessResult = function (processResult) {
            var nutTypes = [{ NutType: 1, Kilos: processResult.kilosFirst, Sacks: processResult.sacksFirst },
                    { NutType: 2, Kilos: processResult.kilosSecond, Sacks: processResult.sacksSecond },
                    { NutType: 3, Kilos: processResult.kilosThird, Sacks: processResult.sacksThird }]
            if (ValidateNutTypes(nutTypes)) {
                var ProcessResult = {
                    ReceptionEntryId: receptionService.receptionEntryId,
                    NutTypes: nutTypes
                };
                processResultService.saveNutTypes(ProcessResult).then(function (response) {
                    msgS.msg('succ', 16);
                    $state.go('processResultManage');
                }, function (response) {
                    msgS.msg('err', 55);
                });
            } else {
                msgS.msg('err', 54);
            }
        };

        $scope.saveSampling = function (sampling) {
            var Sampling = {
                TotalWeightOfEdibleNuts: sampling.TotalWeightOfEdibleNuts,
                WalnutNumber: sampling.WalnutNumber,
                HumidityPercent: sampling.HumidityPercent,
                SampleWeight: sampling.SampleWeight,
                Performance: sampling.Performance,
                DateCapture: $('#EntryDate').val(),
                ReceptionEntryId: receptionService.receptionEntryId
            };
            samplingService.save(Sampling).then(function (response) {
                msgS.msg('succ', 17);
                $state.go('processResultManage');
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3], 3);
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

        var GetAllReceptionSamplings = function () {
            samplingService.getAllReceptions().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[11], 1);
                } else {
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

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        $scope.generatePDF = function(){
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('SamplingReceptionTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Resultado de Proceso (Recepciones)');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:7},
                margin: {horizontal: 10}
            });
            doc.save("ResultadoProcesoRecepciones.pdf");
        };

        (function () {
            switch ($state.current.name) {
                case 'processResultSampling':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    break;
                case 'processResult':
                    $scope.folios = receptionService.folio;
                    break;
                case 'processResultAdd':
                    GetAllReceptionEntries();
                    break;
                case 'processResultManage':
                    GetAllReceptionSamplings();
                    break;
            };
        })();
    });
})();