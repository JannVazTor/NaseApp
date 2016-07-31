(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('reportController', function ($filter, $q, msgS, $scope, $state, DTOptionsBuilder, DTColumnBuilder, reportService, producerService) {
        $scope.dtOptions = {};
        $scope.dtColumns = [];
        $scope.reportingProcess = [];
        $scope.reportOrigin = [];
        $scope.producerReport = [];

        $scope.getProducerReport = function (id) {
            reportService.getProducerReport(id).then(function (response) {
                $scope.producerReport = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8], 3);
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[5], 1);
                } else {
                    $scope.producers = response.data;
                    $scope.producer = $scope.producers[0];
                };
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8], 3);
            });
        };

        var GetReportingProcess = function () {
            reportService.getReportingProcess().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[7], 1);; }
                $scope.reportingProcess = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12], 3);
            });
        };

        var GetCurrentInventory = function () {
            var defer = $q.defer();
            reportService.getCurrentInventoryReport().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10], 1); };
                defer.resolve(response.data);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12], 3);
                defer.reject();
            });
            return defer.promise;
        };

        var GetProcessInventory = function () {
            var defer = $q.defer();
            reportService.getProcessInventory().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10], 1) };
                defer.resolve(response.data);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12], 3);
                defer.reject();
            });
            return defer.promise;
        };

        var GetReportOrigin = function () {
            reportService.getReportOrigin().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 5)
                } else {
                    $scope.reportOrigin = response.data;
                    $scope.reportOriginFirst = $scope.reportOrigin[0];
                }
            }, function (response) {
                msgS.msg('err', 14);
            })
        };

        var GetColumns = function () {
            return [
                DTColumnBuilder.newColumn('DateCapture').withTitle('Fecha de Captura').renderWith(function (data, type, full) {
                    return $filter('date')(data, 'dd/MM/yyyy HH:mm');
                }),
                DTColumnBuilder.newColumn('Receptions').withTitle('Recepciones'),
                DTColumnBuilder.newColumn('Size').withTitle('Tamaño'),
                DTColumnBuilder.newColumn('Sacks').withTitle('Sacos'),
                DTColumnBuilder.newColumn('Kilos').withTitle('Kilos'),
                DTColumnBuilder.newColumn('Quality').withTitle('Calidad'),
                DTColumnBuilder.newColumn('Variety').withTitle('Variedad'),
                DTColumnBuilder.newColumn('Producer').withTitle('Productor'),
                DTColumnBuilder.newColumn('FieldName').withTitle('Campo'),
                DTColumnBuilder.newColumn('SampleWeight').withTitle('Peso de la Muestra'),
                DTColumnBuilder.newColumn('HumidityPercent').withTitle('% Humedad'),
                DTColumnBuilder.newColumn('WalnutNumber').withTitle('No.Nueces'),
                DTColumnBuilder.newColumn('Performance').withTitle('Rendimiento'),
                DTColumnBuilder.newColumn('TotalWeightOfEdibleNuts').withTitle('Total')
            ];
        };

        var GetDtOptionsWithPromise = function (promise) {
            return DTOptionsBuilder.fromFnPromise(promise)
                .withPaginationType('full_numbers')
                .withOption('responsive', true)
                .withButtons(['copy', 'excel', 'pdf', 'csv', 'print'])
                .withBootstrap().withBootstrapOptions({
                    Buttons: {
                        classes: {
                            container: 'btn-group',
                            buttons: {
                                normal: 'btn btn-danger'
                            }
                        }
                    },
                    pagination: {
                        classes: {
                            ul: 'pagination pagination-sm'
                        }
                    }
                });
        };
        var GetDtOptions = function () {
            return DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withOption('responsive', true)
                .withButtons(['copy', 'excel', 'pdf', 'csv', 'print'])
                .withBootstrap().withBootstrapOptions({
                    Buttons: {
                        classes: {
                            container: 'btn-group',
                            buttons: {
                                normal: 'btn btn-danger'
                            }
                        }
                    },
                    pagination: {
                        classes: {
                            ul: 'pagination pagination-sm'
                        }
                    }
                });
        };

        var GrillIssueSettings = function (promise) {
            /*return DTOptionsBuilder.fromFnPromise(promise)
                .withDOM('frtip')
                .withPaginationType('full_numbers')
                .withButtons(['copy', 'excel', 'pdf', 'csv', 'print'])
                .withBootstrap().withBootstrapOptions({
                    Buttons: {
                        classes: {
                            container: 'btn-group',
                            buttons: {
                                normal: 'btn btn-danger'
                            }
                        }
                    },
                    pagination: {
                        classes: {
                            ul: 'pagination pagination-sm'
                        }
                    }
                })
                .withOption('fnDrawCallback', function (oSettings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    api.column(15, { page: 'current' }).data().each(function (group, i) {
                        if (last !== group) {
                            $(rows).eq(i).before(
                                '<tr class="group"><td colspan="16">' + group + '</td></tr>'
                            );
                            last = group;
                        }
                    });
                });*/
            $('#example').DataTable({
                "columnDefs": [
                    { "visible": false, "targets": 2 }
                ],
                "order": [[2, 'asc']],
                "displayLength": 25,
                "drawCallback": function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;

                    api.column(15, { page: 'current' }).data().each(function (group, i) {
                        if (last !== group) {
                            $(rows).eq(i).before(
                                '<tr class="group"><td colspan="16">' + group + '</td></tr>'
                            );

                            last = group;
                        }
                    });
                }
            });
        };

        var GetGrillIssueColumns = function () {
            return [
                DTColumnBuilder.newColumn('DateCapture').withTitle('Fecha de Captura').renderWith(function (data, type, full) {
                    return $filter('date')(data, 'dd/MM/yyyy HH:mm');
                }),
                DTColumnBuilder.newColumn('Id').withTitle('#Tarima'),
                DTColumnBuilder.newColumn('Quality').withTitle('Calidad'),
                DTColumnBuilder.newColumn('Variety').withTitle('Variedad'),
                DTColumnBuilder.newColumn('Size').withTitle('Tamaño'),
                DTColumnBuilder.newColumn('Sacks').withTitle('Sacos'),
                DTColumnBuilder.newColumn('Kilos').withTitle('Kilos'),
                DTColumnBuilder.newColumn('Performance').withTitle('Rendimiento'),
                DTColumnBuilder.newColumn('WalnutNumber').withTitle('No.Nueces'),
                DTColumnBuilder.newColumn('HumidityPercent').withTitle('% Humedad'),
                DTColumnBuilder.newColumn('Producer').withTitle('Productor'),
                DTColumnBuilder.newColumn('IssueDateCapture').withTitle('Fecha de Salida').renderWith(function (data, type, full) {
                    return $filter('date')(data, 'dd/MM/yyyy HH:mm');
                }),
                DTColumnBuilder.newColumn('Truck').withTitle('Camion'),
                DTColumnBuilder.newColumn('Driver').withTitle('Conductor'),
                DTColumnBuilder.newColumn('Box').withTitle('Caja'),
                DTColumnBuilder.newColumn('Remission').withTitle('Remision'),
                DTColumnBuilder.newColumn('GrillIssueId').withTitle('No.Salida'),
            ];
        };

        var GetProducerReportColumns = function () {
            return [
                DTColumnBuilder.newColumn('DateReceptionCapture').withTitle('Fecha de Captura').renderWith(function (data, type, full) {
                    return $filter('date')(data, 'dd/MM/yyyy HH:mm');
                }),
                DTColumnBuilder.newColumn('Variety').withTitle('Variedad'),
                DTColumnBuilder.newColumn('FieldName').withTitle('Campo'),
                DTColumnBuilder.newColumn('Remission').withTitle('Remision'),
                DTColumnBuilder.newColumn('Cylinder').withTitle('Cilindro'),
                DTColumnBuilder.newColumn('Folio').withTitle('Folio'),
                DTColumnBuilder.newColumn('KgsOrigen').withTitle('Kgs. en el Origen'),
                DTColumnBuilder.newColumn('ProcessDate').withTitle('Fecha de Proceso').renderWith(function (data, type, full) {
                    return $filter('date')(data, 'dd/MM/yyyy HH:mm');
                }),
                DTColumnBuilder.newColumn('SacksP').withTitle('Sacos de Primera'),
                DTColumnBuilder.newColumn('KilosFirst').withTitle('Kg. de Primera'),
                DTColumnBuilder.newColumn('SacksS').withTitle('Sacos de Segunda'),
                DTColumnBuilder.newColumn('KilosSecond').withTitle('Kg. de Segunda'),
                DTColumnBuilder.newColumn('KilosTotal').withTitle('Kgs. Totales')
            ];
        };

        (function () {
            switch ($state.current.name) {
                case 'producerReport':
                    GetAllProducers();
                    $scope.getProducerReport(1);
                    $scope.dtOptions = GetDtOptions();
                    break;
                case 'reportingProcess':
                    $scope.dtOptions = GetDtOptions(GetReportingProcess());
                    break;
                case 'currentInventory':
                    $scope.dtOptions = GetDtOptionsWithPromise(GetCurrentInventory())
                    $scope.dtColumns = GetColumns();
                    $scope.title = 'Inventario Actual (Parrillas)'
                    break;
                case 'processInventory':
                    $scope.dtOptions = GetDtOptionsWithPromise(GetProcessInventory());
                    $scope.dtColumns = GetColumns();
                    $scope.title = 'Inventario de Proceso (Parrillas)';
                    break;
                case 'grillIssues':
                    $scope.dtOptions = GetDtOptionsWithPromise(reportService.getGrillIssuesReport);
                    $scope.dtColumns = GetGrillIssueColumns();
                    $scope.title = 'Salidas (Parrillas)';
                    break;
                case 'reportOrigin':
                    $scope.dtOptions = GetDtOptions(GetReportOrigin());
                    break;
                default:
                    break;
            };
        })();
    });
})();