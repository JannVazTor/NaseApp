(function(){
    'use strict'
    angular.module('naseNutAppApp').controller('reportProducerController', function ( $scope, $state,DTOptionsBuilder, DTColumnBuilder ){   
         $scope.dtOptions =  DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap().withOption('responsive', true);

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Fecha').withTitle('Fecha').withClass('text-danger'),
            DTColumnBuilder.newColumn('Variedad').withTitle('Variedad'),
            DTColumnBuilder.newColumn('Remisión').withTitle('Remisión'),
            DTColumnBuilder.newColumn('Cilindro').withTitle('Cilindro'),
            DTColumnBuilder.newColumn('Folio').withTitle('Folio'),
            DTColumnBuilder.newColumn('Kgs. Origen').withTitle('Kgs. Origen'),
            DTColumnBuilder.newColumn('Fecha de Proceso').withTitle('Fecha de Proceso'),
            DTColumnBuilder.newColumn('Sacos').withTitle('Sacos'),
            DTColumnBuilder.newColumn('Kilogramos').withTitle('Kilogramos'),
            DTColumnBuilder.newColumn('Sacos Segunda').withTitle('Sacos Segunda'),
            DTColumnBuilder.newColumn('Kilogramos').withTitle('Kilogramos'),
            DTColumnBuilder.newColumn('Total').withTitle('Total')
        ];
    });
})();