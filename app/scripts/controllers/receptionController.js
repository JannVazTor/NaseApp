var operateFormatter;
var operateFormatterIfIsReceptionToGrill;
var operateEvents;
var onAddReceptionToGrillChange;

(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function (fieldService, toastr, msgS, $filter, $scope, $state, receptionService, producerService, cylinderService, varietyService, receptionAndGrillService, clearService, $rootScope) {
        //When the load page
        $scope.selectedRole = {};
        $scope.receptions = [];
        $scope.producers = [];
        $scope.varieties = [];
        $scope.fields = [];
        $scope.Grills = [];
        //Data shared
        $scope.savedSuccesfully = false;
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.GrillId = receptionAndGrillService.grillId;
        $scope.receptionEntry = [];
        //Init dropdown ReceptionAdd
        $scope.reception = [];
        $scope.reception.Field = "";
        $scope.receptionEntry.Cylinder = "";
        $scope.receptionEntry.Variety = "";
        $scope.receptionEntry.Producer = "";
        $scope.receptionUpdateModel = {};
        $scope.receptionU = receptionService.reception;

        $scope.redirectReceptionToGrill = function (receptionFolio, receptionId) {
            receptionAndGrillService.IsGrillToReception = true;
            receptionAndGrillService.receptionId = receptionId;
            receptionAndGrillService.receptionFolio = receptionFolio;
            $state.go('grillManage');
        };
        $scope.removeReception = function (folio) {
            $.each($scope.receptions, function (i) {
                if ($scope.receptions[i].Folio === folio) {
                    $scope.receptions.splice(i, 1);
                    return false;
                }
            });
        };
        var findDuplicateByFolio = function (folio, array) {
            var found = $filter('filter')(array, { Folio: folio }, true);
            if (found.length) {
                return true;
            } else {
                return false;
            }
        };

        $scope.redirectAddGrill = function () {
            $state.go('grillAdd');
        };

        $scope.addReception = function (reception) {
            if (!findDuplicateByFolio(reception.Folio, $scope.receptions)) {
                $scope.receptions.push({
                    Folio: reception.Folio,
                    CarRegistration: reception.CarRegistration,
                    HeatHoursDrying: reception.HeatHoursDrying,
                    Observations: reception.Observations
                });
            } else {
                msgS.msg('err', 78);
            }
        };
        $scope.saveReceptionEntry = function (receptionEntry) {
            if ($scope.receptions.length === 0) {
                msgS.msg('err', 79);
            } else {
                if (!receptionEntry.Cylinder) {
                    msgS.msg('err', 80);
                } else {
                    if (!receptionEntry.Variety) {
                        msgS.msg('err', 81);
                    } else {
                        if (!receptionEntry.Producer) {
                            msgS.msg('err', 82);
                        } else {
                            var ReceptionEntry = {
                                receptions: $scope.receptions,
                                CylinderId: receptionEntry.Cylinder.Id,
                                VarietyId: receptionEntry.Variety.Id,
                                ProducerId: receptionEntry.Producer.Id,
                                EntryDate: $('#EntryDate').val()
                            };
                            receptionService.saveEntry(ReceptionEntry).then(function (response) {
                                GetAllCylinders();
                                msgS.msg('succ', 7);
                                $scope.receptions = [];
                            }, function (response) {
                                if (response.status === 409) {
                                    msgS.msg('err', 53);
                                } else {
                                    msgS.msg('err', 23);
                                }
                            });
                        }
                    }
                }
            }
        };

        $scope.redirectAddRemission = function (folio) {
            receptionService.folio = folio;
            $state.go('remissionAdd');
        };

        $scope.redirectUpdate = function (receptionId, reception, folio) {
            receptionService.ReceptionId = receptionId;
            receptionService.Folio = folio;
            receptionService.reception = {
                ReceivedFromField: reception.ReceivedFromField,
                FieldId: reception.FieldName,
                CarRegistration: reception.CarRegistration,
                HeatHoursDrying: reception.HeatHoursDrying,
                HumidityPercent: reception.HumidityPercent,
                Observations: reception.Observations,
                EntryDate: reception.EntryDate
            };
            $state.go('receptionUpdate');
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            clearService.clearReceptionAndGrillService();
            if ($state.current.name !== 'receptionUpdate') {
                clearService.clearReceptionService();
            }
            onStateChange();
        });

        $scope.updateReception = function (reception) {
            var ReceptionUpdate = {
                ReceivedFromField: reception.ReceivedFromField,
                CarRegistration: reception.CarRegistration,
                HeatHoursDrying: reception.HeatHoursDrying,
                Observations: reception.Observations,
                Folio: receptionService.Folio,
                EntryDate: $('#EntryDate').val()
            };
            receptionService.update(receptionService.ReceptionId, ReceptionUpdate).then(function (response) {
                msgS.msg('succ', 22);
                $scope.return();
            }, function (response) {
                msgS.msg('err', 83);
            });
        }

        $scope.addReceptionToGrill = function (receptionId, checked) {
            if (checked) {
                receptionAndGrillService.addReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    msgS.msg('succ', 23);
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    msgS.msg('err', 84);
                });
            } else {
                receptionAndGrillService.removeReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    msgS.msg('succ', 24);
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    msgS.msg('err', 85);
                });
            }
        };

        $scope.saveReception = function () {
            $scope.reception.EntryDate = $('#EntryDate').val();
            receptionService.save($scope.reception).then(function (response) {
                $scope.savedSuccesfully = true;
                msgS.msg('succ', 25);
                $state.go('receptionManage');
            }, function (response) {
                msgS.msg('err', 86);
            });
        };

        $scope.confirmationDelete = function (receptionId, folio) {
            swal(msgS.swalConfig("¿Estas seguro que desea eliminar el folio " + folio + "?"),
                function () {
                    deleteReception(receptionId);
                });
        };

        var deleteReception = function (receptionId) {
            receptionService.delete(receptionId).then(function (response) {
                $('#receptionManageTable').bootstrapTable('removeByUniqueId', receptionId);
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 87);
            });
        };

        $scope.redirectAddHumidity = function (receptionId, cylinderName) {
            receptionService.CylinderName = cylinderName;
            receptionService.ReceptionId = receptionId;
            $state.go('humidity');
        };

        $scope.redirectAddSelection = function () {
            $state.go('selection');
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 3);
                } else {
                    $scope.producers = response.data;
                    $scope.receptionEntry.Producer = $scope.producers[0];
                }
            }, function (response) {
                msgS.msg('err', 8);

            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 2);
                    $scope.varieties = response.data;
                    $scope.receptionEntry.Variety = $scope.varieties[0];
                } else {
                    $scope.varieties = response.data;
                    $scope.receptionEntry.Variety = $scope.varieties[0];
                }
            }, function (response) {
                msgS.msg('err', 7);
            });
        };

        var GetAllCylinders = function () {
            cylinderService.getAllActive().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 1);
                    $scope.cylinders = response.data;
                    $scope.receptionEntry.Cylinder = $scope.cylinders[0];
                } else {
                    $scope.cylinders = response.data;
                    $scope.receptionEntry.Cylinder = $scope.cylinders[0];
                }
            }, function (response) {
                msgS.msg('err', 6);

            });
        };

        var GetAllReceptions = function () {
            receptionService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 0);
                    $scope.receptions = response.data;
                    fillTable(response.data);
                } else {
                    $scope.receptions = response.data;
                    response.data.forEach(function (element) {
                        element.IsAlreadyAssigned = element.Grills.indexOf($scope.GrillId) === -1 ? false : true;
                    }, this);
                    fillTable(response.data);
                }
            }, function (response) {
                msgS.msg('err', 5);
            });
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

        function FillUpdateReceptionObject(reception) {
            $scope.receptionUpdateModel.ReceivedFromField = reception.ReceivedFromField,
                $scope.receptionUpdateModel.CarRegistration = reception.CarRegistration,
                $scope.receptionUpdateModel.HeatHoursDrying = reception.HeatHoursDrying,
                $scope.receptionUpdateModel.Observations = reception.Observations,
                $scope.date = reception.EntryDate
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
            var elem = document.getElementById('receptionManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Recepciones Registradas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: { fontSize: 8 },
                margin: { horizontal: 10 }
            });
            doc.save("RecepcionesRegistradas.pdf");
        };

        /* Start Table Functions*/
        function fillTable(receptions) {
            $('#receptionManageTable').bootstrapTable({
                data: receptions
            });
        };

        $('#receptionManageTable').on('refresh.bs.table', function (params) {
            GetAllReceptions();
        });

        operateFormatter = function (value, row, index) {
            return [
                '<button class="btn btn-default edit" href="javascript:void(0)" title="Modificar">',
                '<i class="md md-edit"></i>',
                '</button>',
                '<button class="btn btn-default delete" href="javascript:void(0)" title="Eliminar">',
                '<i class="md md-delete"></i>',
                '</button>',
                '<button class="btn btn-default redirectReceptionToGrill" href="javascript:void(0)" title="Asignar Parrillas">',
                '<i class="md md-view-module"></i>',
                '</button>',
                '<button class="btn btn-default redirectToAddRemission" href="javascript:void(0)" title="Agregar Remisión">',
                '<i class="md md-description"></i>',
                '</button>'
            ].join('');
        };
        operateFormatterIfIsReceptionToGrill = function (value, row, index) {
            var isChecked = value ? "checked" : "";
            return [
                '<div class="toggle-switch">',
                '<input id="' + row.Id + '" type="checkbox" onclick="onAddReceptionToGrillChange(this)" hidden="hidden" ' + isChecked + '>',
                '<label for="' + row.Id + '" class="ts-helper"></label>',
                '</div>'
            ].join('');
        };
        onAddReceptionToGrillChange = function (checkBox) {
            var id = $(checkBox).attr('id');
            $scope.addReceptionToGrill(id, checkBox.checked)
        };
        operateEvents = {
            'click .edit': function (e, value, row, index) {
                $scope.redirectUpdate(row.Id, row, row.Folio);
            },
            'click .delete': function (e, value, row, index) {
                $scope.confirmationDelete(row.Id, row.Folio);
            },
            'click .redirectReceptionToGrill': function (e, value, row, index) {
                $scope.redirectReceptionToGrill(row.Folio, row.Id);
            },
            'click .redirectToAddRemission': function (e, value, row, index) {
                $scope.redirectAddRemission(row.Folio);
            }
        };

        dateFormatter = function (value) {
            return $filter('date')(value, 'dd/MM/yyyy HH:mm').toString();
        };
        /* End Table Functions*/

        (function () {
            switch ($state.current.name) {
                case 'receptionManage':
                    GetAllReceptions();
                    break;
                case 'receptionAdd':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    GetAllProducers();
                    GetAllCylinders();
                    GetAllVarieties();
                    break;
                case 'receptionUpdate':
                    FillUpdateReceptionObject(receptionService.reception);
                    break;
                default:
                    break;
            }
        })();
    });
})();