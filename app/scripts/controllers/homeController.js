(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('homeController', function ($scope) {
        (function () {
            $('#pieChart').highcharts({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Variedades'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: [
                        ['Badour', 30.0],
                        ['Wichita', 45.0],
                        ['Western', 26.8],
                        {
                            name: 'Mixta',
                            y: 12.8,
                            sliced: true,
                            selected: true
                        },
                        ['Choctow', 8.5],
                        ['Mahan', 6.2],
                        ['Navajo', 0.7]
                    ]
                }]
            });
        })();

        (function () {
            $('#barChart').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Parrillas'
                },
                xAxis: {
                    categories: ['Parrillas']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Inventario de Parrillas'
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
                series: [{
                    name: 'Inventario',
                    data: [2]
                }, {
                        name: 'Salidas',
                        data: [3]
                    }]
            });
        })();

        (function () {
            $('#barChartTime').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Produccion de Nuez'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
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
                    name: 'Grande',
                    data: [49.9, 71.5, 106.4]

                }, {
                        name: 'Mediana',
                        data: [83.6, 78.8, 98.5]

                    }, {
                        name: 'Chica',
                        data: [48.9, 38.8, 39.3]

                    }]
            });
        })();
    });
})();