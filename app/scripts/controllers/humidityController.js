var operateFormatterHumidityAdd;
var operateEventsHumidityAdd;
var operateFormatterHumidity;
var operateEventsHumidity;
var dateFormatter;

(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('humidityController', function ($filter, msgS, $state, $scope, humidityService, receptionService, clearService, $rootScope) {
        $scope.humiditiesInReceptionEntry;

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'humidityAddToReception') {
                clearService.clearReceptionService();
                onStateChange();
            }
        });

        var GetAllHumiditiesByReception = function () {
            humidityService.getByReceptionEntry(receptionService.receptionEntryId).then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humiditiesInReceptionEntry = response.data;
                } else {
                    msgS.msg('info', 18);
                }
            }, function (response) {
                msgS.msg('err', 71);
            });
        };

        var GetAllHumidities = function () {
            humidityService.getAll().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humiditiesInReceptionEntry = response.data;
                    fillHumidityManageTable(response.data);
                } else {
                    $scope.humiditiesInReceptionEntry = response.data;
                    fillHumidityManageTable(response.data);
                    msgS.msg('info', 18);
                }
            }, function (response) {
                msgS.msg('err', 71);
            });
        };

        var GetAllHumiditiesLastSamplings = function () {
            humidityService.getLastHumiditiesSamplings().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humiditiesInReceptionEntry = response.data;
                    fillHumidityLastSamplingsTable(response.data);
                } else {
                    $scope.humiditiesInReceptionEntry = response.data;
                    fillHumidityLastSamplingsTable(response.data);
                    msgS.msg('info', 8);
                }
            }, function (response) {
                msgS.msg('err', 20);
            });
        };

        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length === 0) {
                    fillHumidityAddTable(response.data);
                    msgS.msg('info', 0);
                } else {
                    $scope.humiditiesInReceptionEntry = response.data;
                    fillHumidityAddTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 5);
            });
        }

        $scope.redirectToAddHumidity = function (receptionEntryId) {
            receptionService.receptionEntryId = receptionEntryId;
            $state.go('humidityAddToReception');
        };

        $scope.saveHumidity = function (humidity) {
            var Humidity = {
                HumidityPercent: humidity,
                ReceptionEntryId: receptionService.receptionEntryId
            };
            humidityService.save(Humidity).then(function (response) {
                GetAllHumiditiesByReception();
                msgS.msg('succ', 21);
            }, function (response) {
                msgS.msg('err', 69);
            });
        };

        $scope.confirmationDelete = function (Id) {
            swal(msgS.swalConfig("¿Estas seguro que deseas eliminar este registro?"),
                function () {
                    deleteHumidity(Id);
                });
        };

        $scope.generatePDF = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('humidityManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Humedades Registradas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
            });
            doc.save("Humedades Registradas.pdf");
        };

        var deleteHumidity = function (Id) {
            humidityService.delete(Id).then(function (response) {
                if ($state.current.name === 'humidityManage') {
                    $('#humidityManageTable').bootstrapTable('removeByUniqueId', Id);
                    $.each($scope.humiditiesInReceptionEntry, function (i) {
                        if ($scope.humiditiesInReceptionEntry[i].Id === Id) {
                            $scope.humiditiesInReceptionEntry.splice(i, 1);
                            return false;
                        }
                    });
                }
                if ($state.current.name === 'humidityAddToReception') {
                    $.each($scope.humiditiesInReceptionEntry.Humidities, function (i) {
                        if ($scope.humiditiesInReceptionEntry.Humidities[i].Id === Id) {
                            $scope.humiditiesInReceptionEntry.Humidities.splice(i, 1);
                            return false;
                        }
                    });
                }
                if ($state.current.name === 'humidityLastSamplings') {
                    $('#humidityLastSamplingTable').bootstrapTable('removeByUniqueId', Id);
                    $.each($scope.humiditiesInReceptionEntry, function (i) {
                        if ($scope.humiditiesInReceptionEntry[i].Id === Id) {
                            $scope.humiditiesInReceptionEntry.splice(i, 1);
                            return false;
                        }
                    });
                    GetAllHumiditiesLastSamplings();
                }
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 70);
            });
        };

        $scope.return = function () {
            $state.go($rootScope.prevState);
        };

        /* Start Table Functions*/
        function fillHumidityAddTable(humidities) {
            $('#humidityAddTable').bootstrapTable({
                columns: [
                    {
                        field: 'Cylinder',
                        align: 'center',
                        title: 'Cilindro'
                    }, {
                        field: 'Receptions',
                        align: 'center',
                        title: 'Recepciones (Folios)'
                    }, {
                        field: 'EntryDate',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha de Captura'
                    }, {
                        field: 'Variety',
                        align: 'center',
                        title: 'Variedad'
                    }, {
                        field: 'Producer',
                        align: 'center',
                        title: 'Productor'
                    }, {
                        field: 'operate',
                        align: 'center',
                        title: 'Operadores',
                        events: 'operateEventsHumidityAdd',
                        formatter: 'operateFormatterHumidityAdd'
                    }],
                data: humidities
            });
        };

        function fillHumidityLastSamplingsTable(humidities) {
            $('#humidityLastSamplingTable').bootstrapTable({
                columns: [
                    {
                        field: 'CylinderName',
                        align: 'center',
                        title: 'Cilindro'
                    }, {
                        field: 'FieldName',
                        align: 'center',
                        title: 'Campos'
                    }, {
                        field: 'Tons',
                        align: 'center',
                        title: 'Toneladas'
                    }, {
                        field: 'EntryDate',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha de Entrada'
                    }, {
                        field: 'Folio',
                        align: 'center',
                        title: 'Folios'
                    }, {
                        field: 'DateCapture',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha de Captura'
                    }, {
                        field: 'HumidityPercentage',
                        align: 'center',
                        title: '% Humedad'
                    }, {
                        field: 'operate',
                        align: 'center',
                        title: 'Operadores',
                        events: 'operateEventsHumidity',
                        formatter: 'operateFormatterHumidity'
                    }],
                data: humidities
            });
        };

        function fillHumidityManageTable(humidities) {
            $('#humidityManageTable').bootstrapTable({
                columns: [
                    {
                        field: 'CylinderName',
                        align: 'center',
                        title: 'Cilindro'
                    }, {
                        field: 'FieldName',
                        align: 'center',
                        title: 'Campos'
                    }, {
                        field: 'Tons',
                        align: 'center',
                        title: 'Toneladas'
                    }, {
                        field: 'EntryDate',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha de Entrada'
                    }, {
                        field: 'Folio',
                        align: 'center',
                        title: 'Folios'
                    }, {
                        field: 'DateCapture',
                        align: 'center',
                        formatter: 'dateFormatter',
                        title: 'Fecha de Captura'
                    }, {
                        field: 'HumidityPercentage',
                        align: 'center',
                        title: '% Humedad'
                    }, {
                        field: 'operate',
                        align: 'center',
                        title: 'Operadores',
                        events: 'operateEventsHumidity',
                        formatter: 'operateFormatterHumidity'
                    }],
                data: humidities
            });
        };

        $('#humidityAddTable').on('refresh.bs.table', function (params) {
            GetAllReceptionEntries();
        });

        $('#humidityLastSamplingTable').on('refresh.bs.table', function (params) {
            GetAllHumiditiesLastSamplings();
        });

        $('#humidityManageTable').on('refresh.bs.table', function (params) {
            GetAllHumidities();
        });

        operateFormatterHumidityAdd = function (value, row, index) {
            return [
                '<button class="btn btn-default redirect" href="javascript:void(0)" title="Agregar Humedades">',
                '<i class="md md-format-color-reset"></i>',
                '</button>'
            ].join('');
        };
        operateFormatterHumidity = function (value, row, index) {
            return [
                '<button class="btn btn-default delete" href="javascript:void(0)" title="Eliminar">',
                '<i class="md md-delete"></i>',
                '</button>'
            ].join('');
        };

        operateEventsHumidityAdd = {
            'click .redirect': function (e, value, row, index) {
                $scope.redirectToAddHumidity(row.Id);
            }
        };
        operateEventsHumidity = {
            'click .delete': function (e, value, row, index) {
                $scope.confirmationDelete(row.Id);
            }
        };

        dateFormatter = function (value) {
            return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
        };
        /* End Table Functions*/

        (function () {
            switch ($state.current.name) {
                case 'humidityAdd':
                    GetAllReceptionEntries();
                    break;
                case 'humidityManage':
                    GetAllHumidities();
                    break;
                case 'humidityAddToReception':
                    GetAllHumiditiesByReception();
                    break;
                case 'humidityLastSamplings':
                    GetAllHumiditiesLastSamplings();
                    break;
                default:
                    break;
            }
        })();
    });
})();
