var grillIssues = {};

(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillIssueController', function (msgS, $filter, $scope, grillService) {
        $scope.grillIssue = {
            Remission: "",
            DateCapture: "",
            Truck: "",
            Driver: "",
            Box: "",
            GrillsIds: []
        };
        $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');

        $scope.grills = [];

        $scope.saveGrillIssue = function () {
            $scope.grillIssue.DateCapture = $('#EntryDate').val();
            $scope.grills.forEach(function (element) {
                if (element.Added) {
                    $scope.grillIssue.GrillsIds.push(element.Id);
                }
            }, this);
            if ($scope.grillIssue.GrillsIds.length === 0) {
                msgS.msg('err', 16);
            } else {
                grillService.saveIssue($scope.grillIssue).then(function (response) {
                    cleanObj();
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Added) {
                            $scope.grills.splice(i, 1);
                            return false;
                        }
                    });
                    GetAllGrills();
                    GetAllIssues();
                    msgS.msg('succ', 3);
                }, function (response) {
                    cleanObj();
                    msgS.msg('err', 17);
                })
            };
        };

        $scope.confirmIssueDelete = function (grillIssueId, remissionIssue) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar la salida con la remision " + remissionIssue + " ?"),
                function () {
                    deleteGrillIssue(grillIssueId, true);
                });
        };

        var deleteGrillIssue = function (grillIssueId, isInView) {
            grillService.deleteGrillIssue(grillIssueId).then(function (response) {
                $.each($scope.issues, function (i) {
                    if ($scope.issues[i].Id === grillIssueId) {
                        $scope.issues.splice(i, 1);
                        return false;
                    }
                });
                if (isInView) {
                    msgS.swalSuccess();
                }
                GetAllGrills();
            }, function (response) {
                msgS.msg('err', 41);
            });
        };

        var GetAllGrills = function () {
            grillService.getAllCurrentInv().then(function (response) {
                $scope.grills = response.data;
                fillGrillTable(response.data);
                if (response.data.length !== 0) {
                    response.data.forEach(function (element) {
                        element.Added = false;
                    }, this);
                } else {
                    msgS.msg('info', 7);
                }
            }, function (response) {
                msgS.msg('err', 19);
            });
        };

        var GetAllIssues = function () {
            grillService.getAllIssues().then(function (response) {
                fillGrillIssues(response.data);
                if (response.data.length === 0) {
                    msgS.msg('info', 11);
                }
            }, function (response) {
                msgS.msg('err', 46);
            });
        };

        function fillGrillIssues(grillIssues) {
            $('#grillIssuestTable').bootstrapTable('destroy');
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
                        Id: nvalue.Id,
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
                        }, {
                            field: 'added',
                            align: 'center',
                            sortable: true,
                            title: 'Agregar',
                            formatter: operateFormatter,
                            events: operateEvents
                        }],
                        data: row.NestedGrills
                    });
                }
            });

            function operateFormatter(value, row, index) {
                return [
                    '<button class="btn btn-default returnGrillToInventory" href="javascript:void(0)" title="Regresar parrilla a inventario">',
                    '<i class="md md-reply"></i>',
                    '</button>'
                ].join('');
            };
        };

        function fillGrillTable(grills, isCurrentInv) {
            $('#grillIssuestGrillTable').bootstrapTable('destroy');
            var $grillITable = $('#grillIssuestGrillTable');
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
                }, {
                    field: 'added',
                    align: 'center',
                    title: 'Agregar',
                    formatter: operateFormatter
                }];

            $grillITable.bootstrapTable({
                columns: columns,
                showRefresh: true,
                showColumns: true,
                uniqueId: "Id",
                pagination: true,
                search: true,
                showExport: true,
                pageList: '[10, 50, 100, 200, TODO]',
                data: grills,
            });

            function operateFormatter(valu, row, index) {
                return [
                    '<div class="checkbox m-b-15">',
                    '<label><input id="'+row.Id+'" type="checkbox" onclick="grillIssues.addGrill(this)">',
                    '<i class="input-helper"></i></label>',
                    '</div>'
                ].join('');
            };

            function dateFormatter(value) {
                return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
            };
        };

        grillIssues.addGrill = function (checkBox) {
            var id = $(checkBox).attr('id');
            $.each($scope.grills, function(index, value){
                if(value.Id === parseInt(id)){
                    value.Added = checkBox.checked;
                }
            });
        };

        window.operateEvents = {
            'click .returnGrillToInventory': function (e, value, row, index) {
                $scope.returnGrillToInventory(row.Id);
            }
        };

        $scope.returnGrillToInventory = function (grillId) {
            grillService.removeGrillFromGrillIssue(grillId).then(function (response) {
                GetAllGrills();
                GetAllIssues();
                msgS.msg('succ', 13);
            }, function (response) {
                msgS.msg('err', 45);
            });
        };

        var cleanObj = function () {
            $scope.grillIssue = {
                Remission: "",
                DateCapture: "",
                Truck: "",
                Driver: "",
                Box: "",
                GrillsIds: []
            };
        };

        GetAllGrills();
        GetAllIssues();
    });
})();