var grill = {};

(function () {
    'use strict'

    angular.module('naseNutAppApp').controller('grillController', function (msgS, $filter, $scope, $state, fieldService, producerService, varietyService, grillService, receptionAndGrillService, clearService, $rootScope) {
        $scope.message = "";
        $scope.grills = [];
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.ReceptionId = receptionAndGrillService.receptionId;
        $scope.ReceptionFolio = receptionAndGrillService.receptionFolio;
        $scope.grill = {
            Producer: {},
            Field: {},
            Variety: {},
            Batch: {}
        };
        $scope.sizes = [
            { Name: "Grande", Type: 1 },
            { Name: "Mediana", Type: 2 },
            { Name: "Chica", Type: 3 }
        ];
        $scope.qualities = [
            { Name: "Primera", Type: 1 },
            { Name: "Segunda", Type: 2 },
            { Name: "Tercera", Type: 3 }
        ];

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'grillUpdate') {
                clearService.clearReceptionAndGrillService();
                clearService.clearGrillService();
                onStateChange();
            }
        });

        $scope.redirectAddSampling = function (grillId, grillNumber) {
            grillService.grillId = grillId;
            grillService.grillFolio = grillNumber;
            $state.go('samplingAdd');
        };
        $scope.redirectUpdate = function (grillId, grill) {
            grillService.grillId = grillId;
            grillService.grill = {
                DateCapture: grill.DateCapture,
                Size: grill.Size,
                Kilos: grill.Kilos,
                Sacks: grill.Sacks,
                Quality: grill.Quality,
                VarietyId: grill.Variety,
                ProducerId: grill.Producer
            };
            $state.go('grillUpdate');
        };

        $scope.UpdateGrill = function (grill) {
            var GrillUpdate = {
                DateCapture: $('#EntryDate').val(),
                Size: grill.Size.Type,
                Kilos: grill.Kilos,
                Sacks: grill.Sacks,
                Quality: grill.Quality.Type,
                VarietyId: grill.Variety.Id,
                ProducerId: grill.Producer.Id
            };
            grillService.update(grillService.grillId, GrillUpdate).then(function (response) {
                msgS.msg('succ', 19);
                $state.go($rootScope.prevState);
            }, function (response) {
                msgS.msg('err', 67);
            });
        }

        $scope.saveGrill = function (grill, redirectType) {
            if ($scope.grill.Batch === null) {
                msgS.msg('err', 29);
            } else {
                if ($scope.grill.Producer === null) {
                    msgS.msg('err', 31);
                } else {
                    if ($scope.grill.Field === null) {
                        msgS.msg('err', 32);
                    } else {
                        if ($scope.grill.Variety === null) {
                            msgS.msg('err', 33);
                        } else {
                            var Grill = {
                                DateCapture: $('#EntryDate').val(),
                                Size: grill.Size.Type,
                                Kilos: grill.Kilos,
                                Sacks: grill.Sacks,
                                Quality: grill.Quality.Type,
                                VarietyId: grill.Variety.Id,
                                ProducerId: grill.Producer.Id,
                                Folio: grill.Folio === undefined || grill.Folio === "" ? 0 : grill.Folio
                            };
                            grillService.save(Grill).then(function (response) {
                                $scope.grill.Kilos = "";
                                $scope.grill.Folio = "";
                                $scope.grill.Sacks = "";
                                msgS.msg('succ', 18);
                                if (redirectType) {
                                    if (redirectType === 1) {
                                        $scope.redirectAddSampling(response.data.Id, response.data.Folio);
                                    }
                                    if (redirectType === 2) {
                                        $scope.redirectReceptionToGrill(response.data.Id);
                                    }
                                }
                            }, function (response) {
                                if (response.status === 409) {
                                    msgS.msg('err', 93);
                                } else {
                                    msgS.msg('err', 66);
                                }
                            });
                        }
                    }
                }
            }
        };

        $scope.redirectReceptionToGrill = function (Id) {
            receptionAndGrillService.IsGrillToReception = true;
            receptionAndGrillService.grillId = Id;
            $state.go('receptionManage');
        };

        $scope.changeStatus = function (status, grillId) {
            if (status) {
                grillService.changeStatus(grillId, 1).then(function (response) {
                    msgS.msg('succ', 20);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = false;
                            return false;
                        }
                    });
                    msgS.msg('err', 65);
                });
            } else {
                grillService.changeStatus(grillId, 0).then(function (response) {
                    msgS.msg('succ', 20);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = true;
                            return false;
                        }
                    });
                    msgS.msg('err', 65);
                });
            }
        };

        $scope.addGrillToReception = function (grillId, checked) {
            if (checked) {
                receptionAndGrillService.addGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    msgS.msg('succ', 18);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    msgS.msg('err', 64);
                });
            } else {
                receptionAndGrillService.removeGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    msgS.msg('succ', 18);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    msgS.msg('err', 63);
                });
            }
        };

        $scope.confirmationDelete = function (grillId, grillFolio) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar la parrilla con el numero " + grillFolio + " ?"),
                function () {
                    deleteGrill(grillId);
                });

        };

        $scope.generatePDF = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('grillManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Parrillas Procesadas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 7 },
                margin: { horizontal: 10 }
            });
            doc.save("ParrillasProcesadas.pdf");
        };

        $scope.generatePDFCurrent = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('grillManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Inventario Actual de Proceso');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 7 },
                margin: { horizontal: 10 }
            });
            doc.save("InventarioActual.pdf");
        };
        var deleteGrill = function (grillId) {
            grillService.delete(grillId).then(function (response) {
                $('#grillManageTable').bootstrapTable('removeByUniqueId', grillId);
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Id === grillId) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 62);
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 3);
                } else {
                    $scope.producers = response.data;
                    if ($state.current.name === 'grillUpdate') {
                        $scope.grill.Producer = SearchItemObj($scope.producers, 'ProducerName', grillService.grill.ProducerId);
                    } else {
                        $scope.grill.Producer = $scope.producers[0];
                    }
                };
            }, function (response) {
                msgS.msg('err', 8);
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 2);
                } else {
                    $scope.varieties = response.data;
                    if ($state.current.name === 'grillUpdate') {
                        $scope.grill.Variety = SearchItemObj($scope.varieties, 'VarietyName', grillService.grill.VarietyId);
                    } else {
                        $scope.grill.Variety = $scope.varieties[0];
                    }
                };
            }, function (response) {
                msgS.msg('err', 7);
            });
        };

        var GetAllGrillsCurrentInv = function () {
            grillService.getAllCurrentInv().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 7);
                    fillTable(response.data, true);
                } else {
                    fillTable(response.data, true);
                }
            }, function (response) {
                msgS.msg('err', 19);
            });
        };

        var GetAllGrills = function () {
            grillService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 7);
                    fillTable(response.data);
                } else {
                    response.data.forEach(function (element) {
                        element.IsAlreadyAssigned = element.Receptions.indexOf($scope.ReceptionFolio) === -1 ? false : true;
                    }, this);
                    fillTable(response.data);
                };
            }, function (response) {
                msgS.msg('err', 19);
            });
        };

        function FillUpdateGrillObject(grillU) {
            $scope.grill.Kilos = grillU.Kilos;
            $scope.grill.Sacks = grillU.Sacks;
            $scope.grill.Size = SearchItemObj($scope.sizes, 'Name', grillU.Size);
            $scope.grill.Quality = SearchItemObj($scope.qualities, 'Name', grillU.Quality);
        };

        function SearchItemObj(array, property, id) {
            var item = {};
            $.each(array, function (i) {
                if (array[i][property] === id) {
                    item = array[i];
                    return false;
                }
            });
            return item;
        };

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };

        function fillTable(grills, isCurrentInv) {
            var columns = [
                {
                    field: 'Folio',
                    align: 'center',
                    sortable: true,
                    title: 'No. de Parrilla'
                }, {
                    field: 'DateCapture',
                    align: 'center',
                    sortable: true,
                    title: 'Fecha de Captura',
                    formatter: dateFormatter
                }, {
                    field: 'Receptions',
                    align: 'center',
                    sortable: true,
                    title: 'Recepciones'
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
                    title: 'No. Nueces por Kilo'
                }, {
                    field: 'Performance',
                    align: 'center',
                    sortable: true,
                    title: 'Rendimiento'
                }, {
                    field: 'TotalWeightOfEdibleNuts',
                    align: 'center',
                    sortable: true,
                    title: 'Total'
                }];
            if (!isCurrentInv) {
                if ($scope.IsGrillToReception) {
                    columns.push({
                        field: 'Status',
                        align: 'center',
                        sortable: true,
                        title: 'Asignar Parrilla',
                        formatter: operateFormmatterIfIsGrillToReception
                    });
                } else {
                    columns.push({
                        field: 'Status',
                        align: 'center',
                        sortable: true,
                        title: 'Estado',
                        formatter: statusFormatter
                    });
                    columns.push({
                        field: 'options',
                        align: 'center',
                        sortable: true,
                        title: 'Opciones',
                        events: operateEvents,
                        formatter: operateFormatter
                    });
                }
            } else {
                columns.push({
                    field: 'options',
                    align: 'center',
                    sortable: true,
                    title: 'Opciones',
                    events: operateEventsCurrentInv,
                    formatter: operateFormatterGrillCurrentInv
                });
            }

            $('#grillManageTable').bootstrapTable({
                columns: columns,
                showRefresh: true,
                showColumns: true,
                toolbar: '#toolbar',
                uniqueId: "Id",
                pagination: true,
                search: true,
                showExport: true,
                pageList: '[10, 50, 100, 200, TODO]',
                data: grills,
            });

            function statusFormatter(value, row, index) {
                if ($scope.IsGrillToReception) return;
                var isChecked = value ? "checked" : "";
                return [
                    '<div class="toggle-switch">',
                    '<input id="' + row.Id + '" type="checkbox" class="changeStatus" onclick="grill.onStatusChange(this)" hidden="hidden" ' + isChecked + '>',
                    '<label for="' + row.Id + '" class="ts-helper"></label>',
                    '</div>'
                ].join('');
            };

            function operateFormatter(value, row, index) {
                return [
                    '<button ng-hide="currentUser.role === userRoles.qualityUser" class="btn btn-default edit" href="javascript:void(0)" title="Modificar">',
                    '<i class="md md-edit"></i>',
                    '</button>',
                    '<button ng-hide="currentUser.role === userRoles.qualityUser" class="btn btn-default delete" href="javascript:void(0)" title="Eliminar">',
                    '<i class="md md-delete"></i>',
                    '</button>',
                    '<button ng- hide="currentUser.role === userRoles.qualityUser" class="btn btn-default redirectReceptionToGrill" href="javascript:void(0)" title="Agregar folio de recepción">',
                    '<i class="md md-assignment"></i>',
                    '</button>',
                    '<button ng-show="grill.SampleWeight == \'\'" class="btn btn-default redirectToAddSampling" href="javascript:void(0)" title="Agregar muestreo">',
                    '<i class="md md-description"></i>',
                    '</button>'
                ].join('');
            };

            function operateFormmatterIfIsGrillToReception(value, row, index) {
                var isChecked = row.IsAlreadyAssigned ? "checked" : "";
                return [
                    '<div class="toggle-switch">',
                    '<input id="' + row.Id + '" type="checkbox" onclick="grill.onAddGrillToReceptionChange(this)" hidden="hidden" ' + isChecked + '>',
                    '<label for="' + row.Id + '" class="ts-helper"></label>',
                    '</div>'
                ].join('');
            };

            function operateFormatterGrillCurrentInv(valu, row, index) {
                return [
                    '<button class="btn btn-default delete" href="javascript:void(0)" title="Eliminar">',
                    '<i class="md md-delete"></i>',
                    '</button>'
                ].join('');
            };

            function dateFormatter(value) {
                return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
            };
        };

        grill.onStatusChange = function (checkBox) {
            var id = $(checkBox).attr('id');
            $scope.changeStatus(checkBox.checked, id);
        };

        grill.onAddGrillToReceptionChange = function (checkBox) {
            var id = $(checkBox).attr('id');
            $scope.addGrillToReception(id, checkBox.checked)
        };

        window.operateEventsCurrentInv = {
            'click .delete': function (e, value, row, index) {
                $scope.confirmationDelete(row.Id, row.Folio);
            }
        };

        window.operateEvents = {
            'click .edit': function (e, value, row, index) {
                $scope.redirectUpdate(row.Id, row);
            },
            'click .delete': function (e, value, row, index) {
                $scope.confirmationDelete(row.Id, row.Folio);
            },
            'click .redirectReceptionToGrill': function (e, value, row, index) {
                $scope.redirectReceptionToGrill(row.Id)
            },
            'click .redirectToAddSampling': function (e, value, row, index) {
                $scope.redirectAddSampling(row.Id, row.Folio);
            }
        };

        $('#grillManageTable').on('refresh.bs.table', function (params) {
            GetAllGrills();
        });

        (function () {
            switch ($state.current.name) {
                case 'grillAdd':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    GetAllProducers();
                    GetAllVarieties();
                    break;
                case 'grillManage':
                    GetAllGrills();
                    break;
                case 'grillCurrentInv':
                    GetAllGrillsCurrentInv();
                    break;
                case 'grillUpdate':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    GetAllProducers();
                    GetAllVarieties();
                    FillUpdateGrillObject(grillService.grill);
                    break;
                default:
                    break;
            };
        })();
    });
})();