(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('samplingController', function (msgS, $scope, $filter, $state, samplingService, clearService, grillService, $rootScope) {
        $scope.samplings = [];
        $scope.sampling = samplingService.sampling;

        $scope.CalculatePerformance = function () {
            if ($scope.sampling.SampleWeight !== 0 && $scope.sampling.SampleWeight > 0) {
                $scope.sampling.Performance = Math.round((($scope.sampling.TotalWeightOfEdibleNuts / $scope.sampling.SampleWeight) * 100) * 100) / 100;
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
                GrillId: grillService.grillId
            };
            samplingService.save(Sampling).then(function (response) {
                msgS.msg('succ', 17);
                $state.go('samplingGrillManage');
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3], 3);
            });
        };

        $scope.confirmationDeleteGrill = function (grillId) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar el muestreo de la parrilla numero " + grillId + "?"),
                function () {
                    deleteSampling(grillId);
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

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        $scope.generatePDF = function(){
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('samplingGrillTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Muestreos de Parrillas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:8},
                margin: {horizontal: 10}
            });
            doc.save("MuestreosParrillas.pdf");
        };

        $scope.generatePDFReceptions = function(){
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('SamplingReceptionTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Muestreos de Recepciones');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:8},
                margin: {horizontal: 10}
            });
            doc.save("MuestreosRecepciones.pdf");
        };

        (function () {
            switch ($state.current.name) {
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