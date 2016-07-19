(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('reportController', function (toastr, $scope, $state, DTOptionsBuilder, DTColumnBuilder, reportService, producerService) {
        //$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap().withOption('responsive', true);
        $scope.dtOptions = {};
        $scope.reportingProcess = [];

        $scope.getProducerReport = function (id) {
            reportService.getProducerReport(id).then(function (response) {
                $scope.producerReport = response.data;
            }, function (response) {
                toastr.error('Ocurrio un error al instentar obtener a los productores.');
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se econtraron productores en la base de datos')
                } else {
                    $scope.producers = response.data;
                    $scope.producer = $scope.producers[0];
                };
            }, function (response) {
                toastr.error('la obtencion de productores fallo.');
            });
        };

        var GetDtOptions = function(promise){
            return DTOptionsBuilder.fromFnPromise(promise)
            .withDOM('frtip')
            .withPaginationType('full_numbers')
            .withBootstrap()
            .withOption('responsive', true)
            .withButtons(['copy','excel','pdf','csv','print']);
        };

        (function () {
            switch ($state.current.name) {
                case 'producerReport':
                    GetAllProducers();
                    $scope.dtOptions = GetDtOptions(reportService.getProducerReport(1));
                    break;
                case 'reportingProcess':
                    $scope.dtOptions = GetDtOptions(reportService.getReportingProcess().then(function(response){
                        if(response.data.length === 0){
                            toastr.info('No se encontraron variedades en la base de datos.');
                        }else{
                            $scope.reportingProcess = response.data;
                        }
                    },function(response){
                        toastr.error('Ocurrio un error en el servidor y no se pudo obtener la informacion.');
                    }));
                    break;
                default:
                    break;
            };
        })();
    });
})();