(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('remissionController', function ($filter, $scope, msgS, toastr, $state, remissionService, fieldService, clearService, receptionService, $rootScope) {
        $scope.message = "";
        $scope.folio = receptionService.folio;
        $scope.remission = {
            Field: {},
            Batch: {},
            Box: {}
        };

        $scope.saveRemission = function (remission) {
            if (remission.Field === null) {
                msgS.msg('err', 28);
            } else {
                if (remission.Batch === null) {
                    msgS.msg('err', 29);
                } else {
                    if (remission.Box === null) {
                        msgS.msg('err', 30);
                    } else {
                        var Remission = {
                            DateCapture: $('#EntryDate').val(),
                            Quantity: remission.Quantity,
                            Butler: remission.Butler,
                            TransportNumber: remission.TransportNumber,
                            Driver: remission.Driver,
                            Elaborate: remission.Elaborate,
                            Folio: $scope.folio,
                            FieldId: remission.Field.Id,
                            BatchId: remission.Batch.Id,
                            BoxId: remission.Box.Id,
                            RemissionFolio: remission.RemissionFolio
                        };
                        remissionService.save(Remission).then(function (response) {
                            cleanRemissionObj();
                            msgS.msg('succ', 14);
                        }, function (response) {
                            if (response.status === 409) {
                                msgS.msg('err', 47);
                            } else {
                                msgS.msg('err', 48);
                            };
                        });
                    }
                }
            }
        };

        var cleanRemissionObj = function () {
            $scope.remission.RemissionFolio = "";
            $scope.remission.Quantity = "";
            $scope.remission.Butler = "";
            $scope.remission.TransportNumber = "";
            $scope.remission.Driver = "";
            $scope.remission.Elaborate = "";
        };

        $scope.updateRemission = function (remission) {
            var Remission = {
                DateCapture: $('#EntryDate').val(),
                Quantity: remission.Quantity,
                Butler: remission.Butler,
                TransportNumber: remission.TransportNumber,
                Driver: remission.Driver,
                Elaborate: remission.Elaborate,
                Folio: $scope.folio,
                FieldId: remission.Field.Id,
                BatchId: remission.Batch.Id,
                BoxId: remission.Box.Id
            };
            remissionService.update(remissionService.remission.Id, Remission).then(function (response) {
                msgS.msg('succ', 26);
                $state.go('remissionManage');
            }, function (response) {
                msgS.msg('err', 88);
            });
        };

        function ClearForm() {
            $scope.remission = {};
            $scope.remissionForm.$setPristine();
            $scope.remissionForm.$setUntouched();
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'remissionUpdate') {
                clearService.clearRemissionService();
                onStateChange();
            }
        });

        $scope.redirectUpdate = function (remissionId) {
            remissionService.getById(remissionId).then(function (response) {
                remissionService.remission = {
                    Id: response.data.Id,
                    DateCapture: response.data.DateCapture,
                    Quantity: response.data.Quantity,
                    Butler: response.data.Butler,
                    TransportNumber: response.data.TransportNumber,
                    Driver: response.data.Driver,
                    Elaborate: response.data.Elaborate,
                    FieldId: response.data.FieldId,
                    BatchId: response.data.BatchId,
                    BoxId: response.data.BoxId
                };
                $state.go('remissionUpdate');
            }, function (response) {
                msgS.msg('err', 40);
            });
        };

        $scope.confirmationDelete = function (remissionId, remissionFolio) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar la remision con el numero " + remissionFolio + "?"),
                function () {
                    deleteRemission(remissionId);
                });
        };

        var deleteRemission = function (remissionId) {
            remissionService.delete(remissionId).then(function (response) {
                $('#remissionManageTable').bootstrapTable('removeByUniqueId', remissionId);
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 89);
            });
        };

        var GetAllRemissions = function () {
            remissionService.getAll().then(function (response) {
                fillTable(response.data);
            }, function (response) {
                msgS.msg('err', 90);
            });
        };

        var GetFields = function () {
            fieldService.getFields().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 4);
                } else {
                    $scope.fields = response.data;
                    if ($state.current.name === 'remissionUpdate') {
                        $scope.remission.Field = SearchItemObj($scope.fields, 'Id', remissionService.remission.FieldId);
                        GetBatchesInField($scope.remission.Field.Id);
                    } else {
                        $scope.remission.Field = $scope.fields[0];
                        GetBatchesInField($scope.fields[0].Id);
                    }
                }
            }, function (response) {
                msgS.msg('err', 11);
            });
        };

        var GetBatchesInField = function (fieldId) {
            fieldService.getBatchesInField(fieldId).then(function (response) {
                if (response.data.length === 0) {
                    $scope.batches = {};
                    $scope.boxes = {};
                    msgS.msg('info', 10);
                } else {
                    $scope.batches = response.data;
                    if ($state.current.name === 'remissionUpdate') {
                        $scope.remission.Batch = SearchItemObj($scope.batches, 'Id', remissionService.remission.BatchId);
                        GetBoxesInBatch($scope.remission.Batch.Id);
                    } else {
                        $scope.remission.Batch = $scope.batches[0];
                        GetBoxesInBatch($scope.batches[0].Id);
                    }
                }
            }, function (response) {
                msgS.msg('err', 27);
            });
        };

        var GetBoxesInBatch = function (batchId) {
            fieldService.getBoxesInBatch(batchId).then(function (response) {
                if (response.data.length === 0) {
                    $scope.boxes = {};
                    msgS.msg('info', 9);
                } else {
                    $scope.boxes = response.data;
                    if ($state.current.name === 'remissionUpdate') {
                        $scope.remission.Box = SearchItemObj($scope.boxes, 'Id', remissionService.remission.BoxId);
                    } else {
                        $scope.remission.Box = $scope.boxes[0];
                    }
                }
            }, function (response) {
                msgS.msg('err', 26);
            });
        };

        $scope.getBatchInCurrentField = function (field) {
            if (field !== null) {
                GetBatchesInField(field.Id);
            };
        };

        $scope.getBoxesInCurrentBatch = function (batch) {
            if (batch !== null) {
                GetBoxesInBatch(batch.Id);
            };
        };

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        $scope.generatePDF = function () {
            var doc = new jsPDF('l', 'pt');
            var elem = document.getElementById('remissionManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Remisiones Registradas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 8 },
                margin: { horizontal: 10 }
            });
            doc.save("RemisionesRegistradas.pdf");
        };

        function FillUpdateRemissionObject(remissionUpdateModel) {
            $scope.remission.Id = remissionUpdateModel.Id
            $scope.remission.Quantity = remissionUpdateModel.Quantity,
                $scope.remission.Butler = remissionUpdateModel.Butler,
                $scope.remission.TransportNumber = remissionUpdateModel.TransportNumber,
                $scope.remission.Driver = remissionUpdateModel.Driver,
                $scope.remission.Elaborate = remissionUpdateModel.Elaborate
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

        function fillTable(remissions) {
            $('#remissionManageTable').bootstrapTable({
                columns: [
                    {
                        field: 'Folio',
                        align: 'center',
                        sortable: true,
                        title: 'Folio de Recepción'
                    }, {
                        field: 'RemissionFolio',
                        align: 'center',
                        sortable: true,
                        title: 'Folio de Remisión',
                    }, {
                        field: 'DateCapture',
                        align: 'center',
                        sortable: true,
                        title: 'Fecha de Captura',
                        formatter: dateFormatter
                    }, {
                        field: 'FieldName',
                        align: 'center',
                        sortable: true,
                        title: 'Campo',
                    }, {
                        field: 'Batch',
                        align: 'center',
                        sortable: true,
                        title: 'Huerta/Lote',
                    }, {
                        field: 'Box',
                        align: 'center',
                        sortable: true,
                        title: 'Cuadro',
                    }, {
                        field: 'Variety',
                        align: 'center',
                        sortable: true,
                        title: 'Variedad',
                    }, {
                        field: 'Quantity',
                        align: 'center',
                        sortable: true,
                        title: 'Cantidad',
                    }, {
                        field: 'Butler',
                        align: 'center',
                        sortable: true,
                        title: 'Mayordomo',
                    }, {
                        field: 'TransportNumber',
                        align: 'center',
                        sortable: true,
                        title: 'No. de Transporte',
                    }, {
                        field: 'Driver',
                        align: 'center',
                        sortable: true,
                        title: 'Conductor',
                    }, {
                        field: 'Elaborate',
                        align: 'center',
                        sortable: true,
                        title: 'Elaboro',
                    }, {
                        field: 'options',
                        align: 'center',
                        sortable: true,
                        title: 'Opciones',
                        events: operateEvents,
                        formatter: operateFormatter
                    }],
                showRefresh: true,
                showColumns: true,
                toolbar: '#toolbar',
                uniqueId: "Id",
                pagination: true,
                search: true,
                showExport: true,
                pageList: '[10, 50, 100, 200, TODO]',
                data: remissions
            });

            function operateFormatter(value, row, index) {
                return [
                    '<button class="btn btn-default edit" href="javascript:void(0)" title="Modificar">',
                    '<i class="md md-edit"></i>',
                    '</button>',
                    '<button class="btn btn-default delete" href="javascript:void(0)" title="Eliminar">',
                    '<i class="md md-delete"></i>',
                    '</button>'
                ].join('');
            };

            function dateFormatter(value) {
                return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
            };
        };

        window.operateEvents = {
            'click .edit': function (e, value, row, index) {
                $scope.redirectUpdate(row.Id);
            },
            'click .delete': function (e, value, row, index) {
                $scope.confirmationDelete(row.Id, row.RemissionFolio);
            }
        };

        $('#remissionManageTable').on('refresh.bs.table', function (params) {
            GetAllRemissions()
        });

        (function () {
            switch ($state.current.name) {
                case 'remissionManage':
                    GetAllRemissions();
                    break;
                case 'remissionUpdate':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    FillUpdateRemissionObject(remissionService.remission);
                    GetFields();
                    break;
                case 'remissionAdd':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    GetFields();
                    break;
                default:
                    break;
            };
        })();
    });
})();