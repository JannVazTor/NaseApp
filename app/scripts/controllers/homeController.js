(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('homeController', function (msgS, $q, $scope, homeService) {

        var GetProductionVariety = function () {
            homeService.getProductionVariety().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 6);
                } else {
                    ProduccionVarietyChart(response.data);
                }
            }, function (response) {
                msgS.msg('err', 15);
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

        function AcumulatedByProducer() {
            Highcharts.chart('acumulatedByProducer', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Monthly Average Rainfall'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Acumulado'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rainfall (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
                series: [{
                    name: 'Nase',
                    data: [12000]
                }, {
                        name: 'Titanes',
                        data: [10000]

                    }, {
                        name: 'Otro1',
                        data: [9000]

                    }, {
                        name: 'Otro2',
                        data: [15000]
                    }]
            });
        };
        (function () {
            GetProductionVariety();
        })();
    });
})();