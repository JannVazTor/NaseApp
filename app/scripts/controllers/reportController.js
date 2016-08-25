(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('reportController', function (Excel, $timeout, $filter, $q, msgS, $scope, $state, reportService, producerService) {
        $scope.dtOptions = {};
        $scope.dtColumns = [];
        $scope.reportingProcess = [];
        $scope.dailyProcess = [];
        $scope.grillIssues = [];
        $scope.reportDate = {
            ReportDate: ""
        };
        $scope.genericGrillReport = [];
        $scope.secondCurrentInventory = [];
        $scope.secondGrillIssues = [];

        $scope.getDailyProcessReport = function (date) {
            var DailyProcess = {
                ReportDate: $('#reportDate').val(),
            };
            reportService.getDailyProcess(DailyProcess).then(function (response) {
                $scope.dailyProcess = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8], 3);
            });
        };

        $scope.getTotalSmallSacks = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.SacksFirstSmall);
            }
            return total;
        };
        $scope.getTotalMediumSacks = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var mediumSacks = $scope.dailyProcess[i];
                total += (mediumSacks.SacksFirstMedium);
            }
            return total;
        };

        $scope.getTotalLargeSacks = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var largeSacks = $scope.dailyProcess[i];
                total += (largeSacks.SacksFirstLarge);
            }
            return total;
        };
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.Total);
            }
            return total;
        };
        $scope.getTotalGerminated = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.Germinated);
            }
            return total;
        };

        $scope.getTotalSmallSacks = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.SacksFirstSmall);
            }
            return total;
        };
        $scope.getTotalMediumSacks = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.SacksFirstMedium);
            }
            return total;
        };
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.Total);
            }
            return total;
        };
        $scope.getTotalGerminated = function () {
            var total = 0;
            for (var i = 0; i < $scope.dailyProcess.length; i++) {
                var smallSacks = $scope.dailyProcess[i];
                total += (smallSacks.Germinated);
            }
            return total;
        };

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
            reportService.getCurrentInventoryReport().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10], 1); };
                $scope.genericGrillReport = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12], 3);
            });
        };

        var GetSecondCurrentInventory = function () {
            reportService.getSecondCurrentInventory().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10], 1); };
                $scope.secondCurrentInventory = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12], 3);
            });
        };

        var GetProcessInventory = function () {
            reportService.getProcessInventory().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10], 1) };
                $scope.genericGrillReport = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[12], 3);
            });
        };

        var GetDailyProcess = function () {
            var defer = $q.defer();
            reportService.getDailyProcess().then(function (response) {
                if (response.data.length === 0) { msgS.toastMessage(msgS.infoMessages[10], 1) };
                $scope.dailyProcess = response.data;
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

        var GetGrillIssues = function () {
            reportService.getGrillIssuesReport().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 11);
                } else {
                    angular.forEach(response.data, function (grillIssue, key) {
                        delete grillIssue['Id'];
                        angular.forEach(grillIssue.Grills, function (grill, key) {
                            delete grill['Status'];
                        }, this);
                    }, this);
                    $scope.grillIssues = response.data;
                };
            }, function (response) {
                msgS.msg('err', 46);
            });
        };

        var GetSecondGrillIssues = function () {
            reportService.getSecondGrillIssuesReport().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 11);
                } else {
                    angular.forEach(response.data, function (grillIssue, key) {
                        delete grillIssue['Id'];
                        angular.forEach(grillIssue.Grills, function (grill, key) {
                            delete grill['Status'];
                        }, this);
                    }, this);
                    $scope.secondGrillIssues = response.data;
                };
            }, function (response) {
                msgS.msg('err', 46);
            });
        };

        $scope.myFilter = function (item) {
            debugger;
            return item.Quality == 2;
        };

        $scope.ExportExcel = function () {
            $("reportingProcess").tableExport({
                headings: true,
                footers: true,
                formats: ["xls"],
                fileName: "ReporteProceso",
                type: 'xls',
                escape: false
            });
        };

        $scope.reportingProcessExportPdf = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('reportingProcess');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte de Proceso');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 6 },
                margin: { horizontal: 8 }
            });
            doc.save('Proceso' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.producerReportExportPdf = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('producerReport');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte de Productor');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 6 },
                margin: { horizontal: 8 }
            });
            doc.save('Productor' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.grillIssuesExportPdf = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('grillIssues');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte de Salidas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:6},
                margin: {horizontal: 6},
                fontSize: 6
            });
            doc.save('Salidas' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.secondGrillIssuesExportPdf = function(){
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('secondGrillIssues');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte de Salidas de Segunda');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:6},
                margin: {horizontal: 6},
                fontSize: 6
            });
            doc.save('Salidas de Segunda' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.dailyExportPdf = function(){
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('daily');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte Diario de Proceso');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:8},
                margin: {horizontal: 8}
            });
            doc.save('Proceso Diario' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.originReportExportPdf = function () {
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('originReportTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte de Origen Acumulado');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 12 },
            });
            doc.save('Produccion Origen Acumulado' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.issuesExportPdf = function () {
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('daily');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Producción de Nuez Acumulado');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 7 },
                margin: { horizontal: 10 }
            });
            doc.save('ReporteProduccionAcumulado' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        var GenericExportPdf = function(title){
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('genericReport');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, title);
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:8},
                margin: {horizontal: 10},
                fontSize: 8
            });
            doc.save(title + ' (ReporteParrillas) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.GrillExportPdf = function () {
            switch ($state.current.name) {
                case 'processInventory':
                    GenericExportPdf('Inventario de Proceso')
                    break;
                case 'currentInventory':
                    GenericExportPdf('Inventario Actual');
                    break;
                default:
                    break;
            };
        };

        (function () {
            switch ($state.current.name) {
                case 'producerReport':
                    GetAllProducers();
                    $scope.getProducerReport(1);
                    break;
                case 'reportingProcess':
                    GetReportingProcess();
                    break;
                case 'currentInventory':
                    GetCurrentInventory();
                    $scope.title = 'Inventario Actual (Parrillas)'
                    break;
                case 'secondGrillCurrentInv':
                    GetSecondCurrentInventory();
                    break;
                case 'processInventory':
                    GetProcessInventory();
                    $scope.title = 'Inventario de Proceso (Parrillas)';
                    break;
                case 'grillIssues':
                    GetGrillIssues();
                    $scope.title = 'Salidas (Parrillas)';
                    break;
                case 'secondGrillIssues':
                    GetSecondGrillIssues();
                    $scope.title = 'Salidas de Segunda Calidad (Parrillas)';
                    break;
                case 'reportOrigin':
                    GetReportOrigin();
                    break;
                case 'dailyReport':
                    break;
                default:
                    break;
            };
        })();
    });
})();