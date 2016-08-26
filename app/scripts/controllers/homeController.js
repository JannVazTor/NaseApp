(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('homeController', function (msgS, $q, $scope, homeService) {
        var GetProductionVariety = function () {
            homeService.getProductionVariety().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 16);
                } else {
                    ProduccionVarietyChart(response.data);
                }
            }, function (response) {
                msgS.msg('err', 60);
            });
        };

        var GetGrillIssuesAndInventory = function () {
            homeService.grillIssuesAndInventory().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 15);
                } else {
                    GrillsIssuesAndInventory(response.data);
                }
            }, function (response) {
                msgS.msg('err', 59);
            });
        };

        var GetCylinderOccupiedHours = function () {
            homeService.cylinderOccupiedHours().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 14);
                } else {
                    CylinderOccupiedHours(response.data);
                }
            }, function (response) {
                msgS.msg('err', 58);
            });
        };

        var GetAverageNumberOfNuts = function () {
            homeService.averageNumberOfNuts().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 13);
                } else {
                    AverageNumberOfNuts(response.data);
                }
            }, function (response) {
                msgS.msg('err', 57);
            });
        };

        var GetAcumulatedByProducer = function () {
            homeService.accumulatedNutProducer().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 12);
                } else {
                    AcumulatedByProducer(response.data);
                }
            }, function (response) {
                msgS.msg('err', 56);
            });
        };

        var GetPercentageOfFirstAndSecond = function () {
            homeService.percentageOfFirstAndSecond().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 17);
                } else {
                    var categories = response.data[0].categories;
                    $.each(response.data, function (i) {
                       delete response.data[i]['categories'];
                    });
                    PercentageOfFirstAndSecond(categories, response.data);
                }
            }, function (response) {
                msgS.msg('err', 61);
            });
        };

        function ProduccionVarietyChart(dataO) {
            Highcharts.chart('productionVariety', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Produccion Acumulada por Variedad'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: dataO
                }]
            });
        };

        function AcumulatedByProducer(dataO) {
            Highcharts.chart('acumulatedByProducer', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Acumulado por Productor'
                },
                subtitle: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: [''],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Nuez Acumulada (Kilos)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} kilos</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: dataO
            });
        };

        function CylinderOccupiedHours(dataO) {
            Highcharts.chart('cylinderOccupiedHours', {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Cilindros Ocupados'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        ''
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Horas totales ocupadas'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} horas</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: dataO
            });
        };

        function GrillsIssuesAndInventory(dataO) {
            Highcharts.chart('grillIssuesAndInventory', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Parrillas en Inventario y Salidas'
                },
                xAxis: {
                    categories: ['Primeras', 'Segundas']
                },
                credits: {
                    enabled: false
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: dataO
            });
        };

        function AverageNumberOfNuts(dataO) {
            Highcharts.chart('averageNumberOfNuts', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Nummero de Nueces Promedio por Kilo (Variedades)'
                },
                subtitle: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'numero de nueces promedio por kilo'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> promedio<br/>'
                },

                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: dataO
                }],
                drilldown: {
                    series: []
                }
            });
        };

        function PercentageOfFirstAndSecond(categories, dataO) {
            Highcharts.chart('percentageOfFirstAndSecond', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Porcentaje de Primeras y Segundas (Variedades)'
                },
                xAxis: {
                    categories: categories
                },
                credits: {
                    enabled: false
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'porcentaje de primeras y segundas'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} kilos</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    }
                },
                series: dataO
            });
        };
        (function () {
            GetProductionVariety();
            GetGrillIssuesAndInventory();
            GetCylinderOccupiedHours();
            GetAverageNumberOfNuts();
            GetAcumulatedByProducer();
            GetPercentageOfFirstAndSecond();
        })();
    });
})();