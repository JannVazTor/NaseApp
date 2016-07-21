(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('reportController', function ($filter, $q, msgS, $scope, $state, DTOptionsBuilder, DTColumnBuilder, reportService, producerService) {
        $scope.dtOptions = {};
        $scope.dtColumns = [];
        $scope.reportingProcess = [];

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
                .withDOM('frtip')
                .withPaginationType('full_numbers')
                .withOption('responsive', true)
                .withButtons(['copy', 'excel', 'pdf', 'csv', 'print'])
                .withBootstrap();
        };
        var GetDtOptions = function () {
            return DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withOption('responsive', true)
                .withButtons(['copy', 'excel', 'pdf', 'csv', 'print'])
                .withBootstrap();
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