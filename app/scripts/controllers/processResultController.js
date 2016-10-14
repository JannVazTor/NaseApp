var operateFormatter;
var dateFormatter;
var operateEvents;

var operateEventAddSampling; 
var operateEventAddProcessResult;
var operateFormatterAddSampling; 
var operateFormatterAddProcessResult;

(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('processResultController', function (clearService, processResultService, $rootScope, msgS, $filter, $scope, $state, samplingService, receptionService) {
        $scope.confirmationDeleteReception = function (id, folio) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar el resultado de proceso con el folio " + folio + "?"),
                function () {
                    deleteSampling(id);
                });
        };

        $scope.CalculateWalnutNumberPerKilo = function () {
            if ($scope.sampling.SampleWeight !== 0 && $scope.sampling.SampleWeight > 0) {
                $scope.sampling.WalnutNumberPerKilo = Math.round(($scope.sampling.WalnutNumber * 1000) / $scope.sampling.SampleWeight);
            }
        };

        $scope.redirectUpdate = function (sampling) {
            samplingService.sampling = sampling;
            $state.go('samplingUpdate');
        };

        $scope.redirectAddSampling = function (receptionEntryId) {
            receptionService.receptionEntryId = receptionEntryId;
            $state.go('processResultSampling');
        };

        $scope.isProcessResultSampling = function () {
            return ($state.current.name === 'processResultSampling');
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

        var ValidateNutSizeProcessResult = function (nutSizes) {
            var counter = 0;
            $.each(nutSizes, function (i) {
                if (nutSizes[i].Sacks) {
                    counter += 1;
                }
            });
            return counter >= 1;
        };

        var ValidateNutSizeProcessResultSum = function (nutSizes, sacks) {
            var total = 0;
            $.each(nutSizes, function (i) {
                if (nutSizes[i].Sacks) {
                    total += nutSizes[i].Sacks;
                }
            });
            return total === sacks;
        };

        $scope.CalculatePerformance = function () {
            if ($scope.sampling.SampleWeight !== 0 && $scope.sampling.SampleWeight > 0) {
                $scope.sampling.Performance = Math.round((($scope.sampling.TotalWeightOfEdibleNuts / $scope.sampling.SampleWeight) * 100) * 100) / 100;
            }
        };

        $scope.saveProcessResult = function (processResult) {
            var nutTypes = [{ NutType: 1, Kilos: processResult.kilosFirst, Sacks: processResult.sacksFirst },
                { NutType: 2, Kilos: processResult.kilosSecond, Sacks: processResult.sacksSecond },
                { NutType: 3, Kilos: processResult.kilosThird, Sacks: processResult.sacksThird }];
            var nutSizeProcessResult = [{ NutSize: 1, Sacks: processResult.largeSize },
                { NutSize: 2, Sacks: processResult.mediumSize },
                { NutSize: 3, Sacks: processResult.smallSize }];
            if (ValidateNutTypes(nutTypes) && ValidateNutSizeProcessResult(nutSizeProcessResult)) {
                if (ValidateNutSizeProcessResultSum(nutSizeProcessResult, processResult.sacksFirst)) {
                    var ProcessResult = {
                        ReceptionEntryId: receptionService.receptionEntryId,
                        NutTypes: nutTypes,
                        NutSizeProcessResult: nutSizeProcessResult
                    };
                    processResultService.saveNutTypes(ProcessResult).then(function (response) {
                        msgS.msg('succ', 16);
                        $state.go('processResultManage');
                    }, function (response) {
                        msgS.msg('err', 55);
                    });
                } else {
                    msgS.msg('err', 102);
                }
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
                msgS.msg('err', 72);
            });
        };

        var deleteSampling = function (SamplingId) {
            processResultService.delete(SamplingId).then(function (response) {
                $('#processResultManageTable').bootstrapTable('removeByUniqueId', SamplingId);
                $.each($scope.samplings, function (i) {
                    if ($scope.samplings[i].Id === SamplingId) {
                        $scope.samplings.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 73);
            });
        };

        var GetAllReceptionSamplings = function () {
            samplingService.getAllReceptions().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 19);
                    $scope.samplings = response.data;
                    fillProcessResultManageTable(response.data);
                } else {
                    $scope.samplings = response.data;
                    fillProcessResultManageTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 74);
            });
        };

        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 20);
                    $scope.receptionEntries = response.data;
                    fillProcessResultTable(response.data);
                } else {
                    $scope.receptionEntries = response.data;
                    fillProcessResultTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 5);
            });
        };

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        $scope.generatePDF = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('processResultManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Resultado de Proceso (Recepciones)');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 7 },
                margin: { horizontal: 10 }
            });
            doc.save("ResultadoProcesoRecepciones.pdf");
        };

        /* Start Table Functions*/

        operateFormatter = function (value, row, index) {
            return [
                '<button class="btn btn-default edit" href="javascript:void(0)" title="Editar">',
                '<i class="md md-edit"></i>',
                '</button>',
                '<button class="btn btn-default delete" href="javascript:void(0)" title="Eliminar">',
                '<i class="md md-delete"></i>',
                '</button>',
            ].join('');
        };

        operateFormatterAddSampling = function (value, row, index) {
            if (row.Sampling) return;
            return [
                '<button class="btn btn-default addSampling" href="javascript:void(0)" title="Agregar Muestreo">',
                '<i class="md md-description"></i>',
                '</button>'
            ].join('');
        };

        operateFormatterAddProcessResult = function (value, row, index) {
            if (row.ProcessResult) return;
            return [
                '<button class="btn btn-default addProcessResult" href="javascript:void(0)" title="Agregar Resultado de Proceso">',
                '<i class="md md-assignment-returned"></i>',
                '</button>'
            ].join('');
        };

        operateEvents = {
            'click .edit': function (e, value, row, index) {
                $scope.redirectUpdate(row);
            },
            'click .delete': function (e, value, row, index) {
                $scope.confirmationDeleteReception(row.Id, row.Folio);
            }
        };

        operateEventAddSampling = {
            'click .addSampling': function (e, value, row, index) {
                $scope.redirectAddSampling(row.Id, row.Receptions);
            }
        };

        operateEventAddProcessResult = {
            'click .addProcessResult': function (e, value, row, index) {
                $scope.redirectAddProcessResult(row.Id, row.Receptions);
            }
        };

        dateFormatter = function (value) {
            if (value === null) {
                return '-';
            }
            return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
        };

        $('#processResultManageTable').on('refresh.bs.table', function (params) {
            GetAllReceptionSamplings();
        });

        $('#processResultTable').on('refresh.bs.table', function (params) {
             GetAllReceptionEntries();
        });

        function fillProcessResultTable(processResults) {
            $('#processResultTable').bootstrapTable({
                columns: [
                    {
                        field: 'Receptions',
                        align: 'center',
                        title: 'Recepciones'
                    }, {
                        field: 'EntryDate',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha de Entrada'
                    }, {
                        field: 'Variety',
                        align: 'center',
                        title: 'Variedad'
                    }, {
                        field: 'Producer',
                        align: 'center',
                        title: 'Productor'
                    }, {
                        field: 'Cylinder',
                        align: 'center',
                        title: 'Cilindro'
                    }, {
                        field: 'addSampling',
                        align: 'center',
                        title: 'Agregar Muestreo',
                        events: 'operateEventAddSampling',
                        formatter: 'operateFormatterAddSampling'
                    }, {
                        field: 'addProcessResult',
                        align: 'center',
                        title: 'Agregar Resultado de Proceso',
                        events: 'operateEventAddProcessResult',
                        formatter: 'operateFormatterAddProcessResult'
                    }],
                data: processResults
            });
        };

        function fillProcessResultManageTable(processResults) {
            $('#processResultManageTable').bootstrapTable({
                columns: [
                    {
                        field: 'Folio',
                        align: 'center',
                        title: 'Folios'
                    }, {
                        field: 'Variety',
                        align: 'center',
                        title: 'Variedad'
                    }, {
                        field: 'DateCapture',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha'
                    }, {
                        field: 'SampleWeight',
                        align: 'center',
                        title: 'Peso'
                    }, {
                        field: 'HumidityPercent',
                        align: 'center',
                        title: '% Humedad'
                    }, {
                        field: 'WalnutNumber',
                        align: 'center',
                        title: 'Número de nueces'
                    }, {
                        field: 'Performance',
                        align: 'center',
                        title: 'Rendimiento'
                    }, {
                        field: 'TotalWeightOfEdibleNuts',
                        align: 'center',
                        title: 'Peso total de nueces comestibles'
                    }, {
                        field: 'SacksFirst',
                        align: 'center',
                        title: 'Sacos de Primera'
                    }, {
                        field: 'KilosFirst',
                        align: 'center',
                        title: 'Kilos de Primera'
                    }, {
                        field: 'SacksSecond',
                        align: 'center',
                        title: 'Sacos de Segunda'
                    }, {
                        field: 'KilosSecond',
                        align: 'center',
                        title: 'Kilos de Segunda'
                    }, {
                        field: 'SacksThird',
                        align: 'center',
                        title: 'Sacos de Tercera'
                    }, {
                        field: 'KilosThird',
                        align: 'center',
                        title: 'Kilos de Tercera'
                    }, {
                        field: 'operate',
                        align: 'center',
                        title: 'Operadores',
                        events: 'operateEvents',
                        formatter: 'operateFormatter'
                    }],
                data: processResults
            });
        };
        /* End Table Functions*/

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