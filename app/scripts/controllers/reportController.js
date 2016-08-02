(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('reportController', function ($filter, $q, msgS, $scope, $state, DTOptionsBuilder, DTColumnBuilder, reportService, producerService) {
        $scope.dtOptions = {};
        $scope.dtColumns = [];
        $scope.reportingProcess = [];
        $scope.dailyProcess = [];
        $scope.reportDate = {
            ReportDate:""
        }

        
        $scope.getDailyProcessReport = function (date) {
            var DailyProcess = {
                ReportDate: $('#reportDate').val(),
            };
            reportService.getDailyProcess(DailyProcess).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.dailyProcess = response.data;
                $scope.dtOptions = GetDtOptions(GetDailyProcess);
                msgS.toastMessage(msgS.successMessages[3],2);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3],3);
            });
        };

        $scope.getTotalSmallSacks = function(){
                    var total = 0;
                    for(var i = 0; i < $scope.dailyProcess.length; i++){
                        var smallSacks = $scope.dailyProcess[i];
                        total += (smallSacks.SacksFirstSmall);
                    }
                    return total;
                };
        $scope.getTotalMediumSacks = function(){
                    var total = 0;
                    for(var i = 0; i < $scope.dailyProcess.length; i++){
                        var smallSacks = $scope.dailyProcess[i];
                        total += (smallSacks.SacksFirstMedium);
                    }
                    return total;
                };
        $scope.getTotal = function(){
                    var total = 0;
                    for(var i = 0; i < $scope.dailyProcess.length; i++){
                        var smallSacks = $scope.dailyProcess[i];
                        total += (smallSacks.Total);
                    }
                    return total;
                };
        $scope.getTotalGerminated = function(){
                    var total = 0;
                    for(var i = 0; i < $scope.dailyProcess.length; i++){
                        var smallSacks = $scope.dailyProcess[i];
                        total += (smallSacks.Germinated);
                    }
                    return total;
                };

        $scope.getProducerReport = function (id) {
            reportService.getProducerReport(id).then(function (response) {
                $scope.producerReport = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8],3);
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[5],1);
                } else {
                    $scope.producers = response.data;
                    $scope.producer = $scope.producers[0];
                };
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8],3);
            });
        };

        var GetReportingProcess = function () {
            reportService.getReportingProcess().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[7],1);; }
                $scope.reportingProcess = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12],3);
            });
        };

        var GetCurrentInventory = function () {
            var defer = $q.defer();
            reportService.getCurrentInventoryReport().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10],1); };
                defer.resolve(response.data);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12],3);
                defer.reject();
            });
            return defer.promise;
        };

        var GetProcessInventory = function () {
            var defer = $q.defer();
            reportService.getProcessInventory().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10],1) };
                defer.resolve(response.data);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12],3);
                defer.reject();
            });
            return defer.promise;
        };

        var GetDailyProcess = function () {
            var defer = $q.defer();
            reportService.getDailyProcess().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10],1) };
                $scope.dailyProcess = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12],3);
                defer.reject();
            });
            return defer.promise;
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

        var GetDailyProcessColumns = function () {
            return [
                DTColumnBuilder.newColumn('Date').withTitle('Fecha'),
                DTColumnBuilder.newColumn('Producer').withTitle('Productor'),
                DTColumnBuilder.newColumn('Folio').withTitle('Folio'),
                DTColumnBuilder.newColumn('Cylinder').withTitle('Cilindro'),
                DTColumnBuilder.newColumn('Variety').withTitle('Variedad'),
                DTColumnBuilder.newColumn('Small').withTitle('Chica'),
                DTColumnBuilder.newColumn('Medium').withTitle('Mediana'),
                DTColumnBuilder.newColumn('Total').withTitle('Total'),
                DTColumnBuilder.newColumn('QualityPercent').withTitle('% Calidad'),
                DTColumnBuilder.newColumn('Germinated').withTitle('Germinada'),
            ];
        }

        var GetDtOptionsWithPromise = function (promise) {
            return DTOptionsBuilder.fromFnPromise(promise)
                .withDOM('frtip')
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
            }).withButtons(['copy', 'excel', 'pdf', 'csv', 'print']);
        };

        (function () {
            switch ($state.current.name) {
                case 'producerReport':
                    GetAllProducers();
                    $scope.dtOptions = GetDtOptionsWithPromise(reportService.getProducerReport(1));
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
                default:
                    break;
            };
        })();
    });
})();