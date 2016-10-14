var dateFormatter;

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
        $scope.reportDate = {
            ReportDate: ""
        };

        $scope.getDailyProcessReport = function () {
            reportService.getDailyProcess().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 5);
                } else {
                    $scope.dailyProcess = response.data;
                }
            }, function (response) {
                msgS.msg('err', 14);
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

        $scope.getProducerReport = function (id) {
            reportService.getProducerReport(id).then(function (response) {
                if (response.data.length !== 0) {
                    fillProducerReportTable(response.data);
                } else {
                    fillProducerReportTable(response.data);
                    msgS.msg('info', 5);
                }
            }, function (response) {
                msgS.msg('err', 14);
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 5);
                } else {
                    $scope.producers = response.data;
                    $scope.producer = $scope.producers[0];
                };
            }, function (response) {
                msgS.msg('err', 14);
            });
        };

        var GetReportingProcess = function () {
            reportService.getReportingProcess().then(function (response) {
                if (response.data.length === 0) {
                    fillProcessReportTable(response.data);
                    msgS.msg('info', 5);
                } else {
                    fillProcessReportTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 14);
            });
        };

        var GetCurrentInventory = function () {
            reportService.getCurrentInventoryReport().then(function (response) {
                if (response.data.length === 0) {
                    fillProcessInventoryReportTable(response.data);
                    msgS.msg('info', 5);
                } else {
                    fillProcessInventoryReportTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 14);
            });
        };

        var GetSecondCurrentInventory = function () {
            reportService.getSecondCurrentInventory().then(function (response) {
                if (response.data.length === 0) {
                    fillProcessInventoryReportTable(response.data);
                    msgS.msg('info', 5);
                } else {
                    fillProcessInventoryReportTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 14);
            });
        };

        var GetProcessInventory = function () {
            reportService.getProcessInventory().then(function (response) {
                if (response.data.length === 0) {
                    fillProcessInventoryReportTable(response.data);
                    msgS.msg('info', 5);
                } else {
                    fillProcessInventoryReportTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 14);
            });
        };

        var GetDailyProcess = function () {
            var defer = $q.defer();
            reportService.getDailyProcess().then(function (response) {
                if (response.data.length === 0) {
                    fillDailyReportTable(response.data);
                    msgS.msg('info', 5);
                } else {
                    fillDailyReportTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 14);
                defer.reject();
            });
            return defer.promise;
        };

        var GetOriginReport = function () {
            reportService.getReportOrigin().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 5);
                    fillOriginReport(response.data);
                } else {
                    fillOriginReport(response.data);
                }
            }, function (response) {
                msgS.msg('err', 14);
            })
        };

        var GetGrillIssues = function () {
            reportService.getGrillIssuesReport().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 11);
                    fillGrillIssuesReport(response.data);
                } else {
                    fillGrillIssuesReport(response.data);
                };
            }, function (response) {
                msgS.msg('err', 46);
            });
        };

        var GetSecondGrillIssues = function () {
            reportService.getSecondGrillIssuesReport().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 11);
                    fillGrillIssuesReport(response.data);
                } else {
                    fillGrillIssuesReport(response.data);
                };
            }, function (response) {
                msgS.msg('err', 46);
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
                headerStyles: { fontSize: 6 },
                margin: { horizontal: 6 },
                fontSize: 6
            });
            doc.save('Salidas' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.secondGrillIssuesExportPdf = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('secondGrillIssues');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte de Salidas de Segunda');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 6 },
                margin: { horizontal: 6 },
                fontSize: 6
            });
            doc.save('Salidas de Segunda' + ' (Reporte) - ' + $filter('date')(new Date(), 'dd/MM/yyyy') + '.pdf');
        };

        $scope.dailyExportPdf = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('daily');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Reporte Diario de Proceso');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 8 },
                margin: { horizontal: 8 }
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

        var GenericExportPdf = function (title) {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('genericReport');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, title);
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 8 },
                margin: { horizontal: 10 },
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

        /* Start Origin Report */
        $('#originReportTable').on('refresh.bs.table', function (params) {
            GetOriginReport();
        });

        function fillOriginReport(originReport) {
            var originReportColumns = [];
            var originReportData = [];
            var totalHectares = 0;
            var varietyTotalProduction = 0;
            var totalPerVariety = [];
            var totalRenVariety = [];
            originReportColumns.push({
                field: 'Field',
                align: 'center',
                sortable: true,
                title: 'Campo'
            });
            originReportColumns.push({
                field: 'Batch',
                align: 'center',
                sortable: true,
                title: 'Huerta/Lote'
            });
            originReportColumns.push({
                field: 'Hectares',
                align: 'center',
                sortable: true,
                title: 'Hectareas'
            });
            $.each(originReport[0].Varieties, function (index, value) {
                originReportColumns.push({
                    field: 'Variety' + (index + 1),
                    sortable: true,
                    align: 'center',
                    title: value.Variety
                });
            });
            originReportColumns.push({
                field: 'TotalProduction',
                align: 'center',
                sortable: true,
                title: 'Produccion Total'
            });
            originReportColumns.push({
                field: 'PerformancePerHa',
                align: 'center',
                sortable: true,
                title: 'Rendimiento / Ha'
            });
            $.each(originReport[0].Varieties, function (index, value) {
                originReportColumns.push({
                    field: 'Performance' + (index + 1),
                    align: 'center',
                    sortable: true,
                    title: value.Variety + ' (R%)'
                });
            });
            $.each(originReport, function (index, value) {
                var obj = {
                    Field: value.Field,
                    Batch: value.Batch,
                    Hectares: value.Hectares
                };
                $.each(value.Varieties, function (index, value) {
                    obj['Variety' + (index + 1)] = value.Total;
                    totalPerVariety.push(value.Total);
                });
                obj.TotalProduction = value.TotalProduction;
                obj.PerformancePerHa = value.PerformancePerHa;
                $.each(value.Varieties, function (index, value) {
                    obj['Performance' + (index + 1)] = value.Performance;
                    totalRenVariety.push(value.Performance);
                });
                totalHectares += parseFloat(value.Hectares);
                originReportData.push(obj);
            });
            var totalObj = {
                Field: 'Total',
                Batch: '',
                Hectares: totalHectares
            };
            $.each(totalPerVariety, function (index, value) {
                totalObj['Variety' + (index + 1)] = value;
            });
            totalObj.TotalProduction = varietyTotalProduction;
            totalObj.PerformancePerHa = '';
            $.each(totalRenVariety, function (index, value) {
                totalObj['Performance' + (index + 1)] = value;
            });
            originReportData.push(totalObj);
            $('#originReportTable').bootstrapTable({
                columns: originReportColumns,
                data: originReportData
            });
        };
        /* End Origin Report */

        /* Start Issues Report */
        $('#grillIssuestTable').on('refresh.bs.table', function (params) {
            GetGrillIssues();
        });

        function fillGrillIssuesReport(grillIssues) {
            var $grillIssuesTable = $('#grillIssuestTable');
            var data = [];
            $.each(grillIssues, function (index, value) {
                var obj = {
                    Remission: value.Remission,
                    DateCapture: value.DateCapture,
                    Truck: value.Truck,
                    Driver: value.Driver,
                    Box: value.Box,
                    NestedGrills: []
                };
                var nestedData = [];
                $.each(value.Grills, function (index, nvalue) {
                    var nestedObj = {
                        Folio: nvalue.Folio,
                        DateCapture: nvalue.DateCapture,
                        Receptions: nvalue.Receptions,
                        Size: nvalue.Size,
                        Sacks: nvalue.Sacks,
                        Kilos: nvalue.Kilos,
                        Quality: nvalue.Quality,
                        Variety: nvalue.Variety,
                        Producer: nvalue.Producer,
                        Batch: nvalue.Batch,
                        SampleWeight: nvalue.SampleWeight,
                        HumidityPercent: nvalue.HumidityPercent,
                        WalnutNumber: nvalue.WalnutNumber,
                        Performance: nvalue.Performance,
                        TotalWeightOfEdibleNuts: nvalue.TotalWeightOfEdibleNuts
                    };
                    nestedData.push(nestedObj);
                });
                obj.NestedGrills = nestedData;
                data.push(obj);
            });
            $grillIssuesTable.bootstrapTable({
                columns: [{
                    field: 'Remission',
                    align: 'center',
                    sortable: true,
                    title: 'Remisión'
                }, {
                    field: 'DateCapture',
                    align: 'center',
                    sortable: true,
                    formatter: 'dateFormatter',
                    title: 'Fecha de Captura'
                }, {
                    field: 'Truck',
                    align: 'center',
                    sortable: true,
                    title: 'Camion'
                }, {
                    field: 'Driver',
                    align: 'center',
                    sortable: true,
                    title: 'Conductor'
                }, {
                    field: 'Box',
                    align: 'center',
                    sortable: true,
                    title: 'Caja'
                }],
                data: data,
                showRefresh: true,
                showColumns: true,
                search: true,
                pageList: '[10, 50, 100, 200, TODO]',
                pagination: true,
                toolbar: '#toolbar',
                detailView: true,
                onExpandRow: function (index, row, $detail) {
                    $detail.html('<table></table>').find('table').bootstrapTable({
                        columns: [{
                            field: 'Folio',
                            align: 'center',
                            sortable: true,
                            title: 'No. de Parrilla'
                        }, {
                            field: 'DateCapture',
                            align: 'center',
                            sortable: true,
                            formatter: 'dateFormatter',
                            title: 'Fecha de Captura'
                        }, {
                            field: 'Receptions',
                            align: 'center',
                            sortable: true,
                            title: 'Folios'
                        }, {
                            field: 'Size',
                            align: 'center',
                            sortable: true,
                            title: 'Tamaño'
                        }, {
                            field: 'Sacks',
                            align: 'center',
                            sortable: true,
                            title: 'Sacos'
                        }, {
                            field: 'Kilos',
                            align: 'center',
                            sortable: true,
                            title: 'Kilos'
                        }, {
                            field: 'Quality',
                            align: 'center',
                            sortable: true,
                            title: 'Calidad'
                        }, {
                            field: 'Variety',
                            align: 'center',
                            sortable: true,
                            title: 'Variedad'
                        }, {
                            field: 'Producer',
                            align: 'center',
                            sortable: true,
                            title: 'Productor'
                        }, {
                            field: 'Batch',
                            align: 'center',
                            sortable: true,
                            title: 'Huerta/Lote'
                        }, {
                            field: 'SampleWeight',
                            align: 'center',
                            sortable: true,
                            title: 'Peso de la Muestra'
                        }, {
                            field: 'HumidityPercent',
                            align: 'center',
                            sortable: true,
                            title: '% Humedad'
                        }, {
                            field: 'WalnutNumber',
                            align: 'center',
                            sortable: true,
                            title: 'Número de nueces'
                        }, {
                            field: 'Performance',
                            align: 'center',
                            sortable: true,
                            title: 'Rendimiento'
                        }, {
                            field: 'TotalWeightOfEdibleNuts',
                            align: 'center',
                            sortable: true,
                            title: 'Peso total de nueces comestibles'
                        }],
                        data: row.NestedGrills
                    });
                }
            });
        };
        /* End Issues Report */

        /* Start Process Report Table Functions*/
        function fillProcessReportTable(process) {
            $('#reportingProcess').bootstrapTable({
                columns: [
                    {
                        field: 'Variety',
                        align:'center',
                        sortable: 'true',
                        title: 'Variedad'
                    },{
                        field: 'SacksFirstSmall',
                        align:'center',
                        sortable: 'true',
                        title: 'Chicas'
                    },{
                        field: 'SacksFirstMedium',
                        align:'center',
                        sortable: 'true',
                        title: 'Medianas'
                    },{
                        field: 'SacksFirstLarge',
                        align:'center',
                        sortable: 'true',
                        title: 'Grandes'
                    },{
                        field: 'KilogramsFirstSmall',
                        align:'center',
                        sortable: 'true',
                        title: 'CH (Kg)'
                    },{
                        field: 'KilogramsFirstMedium',
                        align:'center',
                        sortable: 'true',
                        title: 'M (Kg)'
                    },{
                        field: 'KilogramsFirstLarge',
                        align:'center',
                        sortable: 'true',
                        title: 'G (Kg)'
                    },{
                        field: 'TotalKilogramsFirst',
                        align:'center',
                        sortable: 'true',
                        title: 'Kgs. Primera'
                    },{
                        field: 'TotalKilogramsSecond',
                        align:'center',
                        sortable: 'true',
                        title: 'Kgs. Segunda'
                    },{
                        field: 'TotalKilogramsThird',
                        align:'center',
                        sortable: 'true',
                        title: 'Kgs. Tercera'
                    },{
                        field: 'PercentageFirst',
                        align:'center',
                        sortable: 'true',
                        title: '% 1ra'
                    },{
                        field: 'PercentageSecond',
                        align:'center',
                        sortable: 'true',
                        title: '% 2da'
                    },{
                        field: 'PercentageThird',
                        align:'center',
                        sortable: 'true',
                        title: '% 3era'
                    },{
                        field: 'TotalKilos',
                        align:'center',
                        sortable: 'true',
                        title: 'Kilos Totales'
                    }],
                    data: process
                });
            };

        /*End Process Report Table Functions */

        /* Start Producer Report Table Functions*/
        function fillProducerReportTable(data) {
            $('#producerReportTable').bootstrapTable({
                columns: [
                    {
                        field: 'ProcessDate',
                        align:'center',
                        formatter: 'dateFormatter',
                        sortable: 'true',
                        title: 'Fecha de Proceso'
                    },{
                        field: 'Variety',
                        align:'center',
                        sortable: 'true',
                        title: 'Variedad'
                    },{
                        field: 'Batch',
                        align:'center',
                        sortable: 'true',
                        title: 'Huerta/s'
                    },{
                        field: 'Cylinder',
                        align:'center',
                        sortable: 'true',
                        title: 'Cilindro'
                    },{
                        field: 'Folio',
                        align:'center',
                        sortable: 'true',
                        title: 'Folio'
                    },{
                        field: 'KgsOrigen',
                        align:'center',
                        sortable: 'true',
                        title: 'Kgs. Origen'
                    },{
                        field: 'SacksP',
                        align:'center',
                        sortable: 'true',
                        title: 'Sacos Primera'
                    },{
                        field: 'KilosFirst',
                        align:'center',
                        sortable: 'true',
                        title: 'Kgs. Primera'
                    },{
                        field: 'SacksS',
                        align:'center',
                        sortable: 'true',
                        title: 'Sacos Segunda'
                    },{
                        field: 'KilosSecond',
                        align:'center',
                        sortable: 'true',
                        title: 'Kgs. Segunda'
                    },{
                        field: 'KilosTotal',
                        align:'center',
                        sortable: 'true',
                        title: 'Total'
                    },{
                        field: 'SacksFirstSmall',
                        align:'center',
                        sortable: 'true',
                        title: 'Chica'
                    },{
                        field: 'SacksFirstMedium',
                        align:'center',
                        sortable: 'true',
                        title: 'Mediana'
                    },{
                        field: 'SacksFirstLarge',
                        align:'center',
                        sortable: 'true',
                        title: 'Grande'
                    },{
                        field: 'SacksFirstTotal',
                        align:'center',
                        sortable: 'true',
                        title: 'Total'
                    }
                ],
                data: data
            });
        };
        dateFormatter = function (value) {
            return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
        };
        /*End Producer Report Table Functions */

        /* Start Process Inventory Report Table Functions*/
        function fillProcessInventoryReportTable(process) {
            $('#genericReport').bootstrapTable({
                columns: [
                    {
                        field: 'Folio',
                        align:'center',
                        sortable: 'true',
                        title: 'No. Parrilla'
                    },{
                        field: 'DateCapture',
                        formatter: 'dateFormatter',
                        align:'center',
                        sortable: 'true',
                        title: 'Fecha de Captura'
                    },{
                        field: 'Receptions',
                        align:'center',
                        sortable: 'true',
                        title: 'Folios'
                    },{
                        field: 'Size',
                        align:'center',
                        sortable: 'true',
                        title: 'Tamaño'
                    },{
                        field: 'Sacks',
                        align:'center',
                        sortable: 'true',
                        title: 'Sacos'
                    },{
                        field: 'Kilos',
                        align:'center',
                        sortable: 'true',
                        title: 'Kilos'
                    },{
                        field: 'Quality',
                        align:'center',
                        sortable: 'true',
                        title: 'Calidad'
                    },{
                        field: 'Variety',
                        align:'center',
                        sortable: 'true',
                        title: 'Variedad'
                    },{
                        field: 'Producer',
                        align:'center',
                        sortable: 'true',
                        title: 'Productor'
                    },{
                        field: 'Field',
                        align:'center',
                        sortable: 'true',
                        title: 'Campo'
                    },{
                        field: 'Batch',
                        align:'center',
                        sortable: 'true',
                        title: 'Huerta/Lote'
                    },{
                        field: 'SampleWeight',
                        align:'center',
                        sortable: 'true',
                        title: 'Peso'
                    },{
                        field: 'HumidityPercent',
                        align:'center',
                        sortable: 'true',
                        title: '% Humedad'
                    },{
                        field: 'WalnutNumber',
                        align:'center',
                        sortable: 'true',
                        title: 'No. Nueces'
                    },{
                        field: 'Performance',
                        align:'center',
                        sortable: 'true',
                        title: 'Rendimiento'
                    },{
                        field: 'TotalWeightOfEdibleNuts',
                        align:'center',
                        sortable: 'true',
                        title: 'Total Nueces Comestibles'
                    }
                    ],
                data: process
            });
        };

        /*End Process Inventory Report Table Functions */

        /* Start Daily Report Table Functions*/
        function fillDailyReportTable(daily) {
            $('#daily').bootstrapTable({
                columns: [
                    {
                        field: 'Date',
                        formatter: 'dateFormatter',
                        align:'center',
                        sortable: 'true',
                        title: 'Fecha'
                    },{
                        field: 'Producer',
                        align:'center',
                        sortable: 'true',
                        title: 'Productor'
                    },{
                        field: 'Folio',
                        align:'center',
                        sortable: 'true',
                        title: 'Folio'
                    },{
                        field: 'Cylinder',
                        align:'center',
                        sortable: 'true',
                        title: 'Cilindro'
                    },{
                        field: 'Variety',
                        align:'center',
                        sortable: 'true',
                        title: 'Variedad'
                    },{
                        field: 'SacksFirstLarge',
                        align:'center',
                        sortable: 'true',
                        title: 'Grande'
                    },{
                        field: 'SacksFirstMedium',
                        align:'center',
                        sortable: 'true',
                        title: 'Mediana'
                    },{
                        field: 'SacksFirstSmall',
                        align:'center',
                        sortable: 'true',
                        title: 'Chica'
                    },{
                        field: 'Total',
                        align:'center',
                        sortable: 'true',
                        title: 'Total Primera'
                    },{
                        field: 'QualityPercent',
                        align:'center',
                        sortable: 'true',
                        title: '% Calidad'
                    },{
                        field: 'Germinated',
                        align:'center',
                        sortable: 'true',
                        title: 'Total Segunda'
                    },
                    ],
                data: daily
            });
        };
        /*End Daily Report Table Functions */


        dateFormatter = function (value) {
            return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
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
                    GetOriginReport();
                    break;
                case 'dailyReport':
                    GetDailyProcess();
                    break;
                default:
                    break;
            };
        })();
    });
})();