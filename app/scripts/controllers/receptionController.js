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
        }
        $scope.addReception = function (reception) {
            if (!findDuplicateByFolio(reception.Folio, $scope.receptions)) {
                $scope.receptions.push({
                    Folio: reception.Folio,
                    EntryDate: $('#EntryDate').val(),
                    CarRegistration: reception.CarRegistration,
                    HeatHoursDrying: reception.HeatHoursDrying,
                    Observations: reception.Observations
                });
            } else {
                msgS.toastMessage(msgS.infoMessages[1], 1);
            }
        };
        $scope.saveReceptionEntry = function (receptionEntry) {
            debugger;
            if ($scope.receptions.length === 0) {
                msgS.toastMessage(msgS.infoMessages[0], 1);
            } else {
                if (!receptionEntry.Cylinder) {
                    msgS.toastMessage(msgS.infoMessages[2], 1);
                } else {
                    if (!receptionEntry.Variety) {
                        msgS.toastMessage(msgS.infoMessages[3], 1);
                    } else {
                        if (!receptionEntry.Producer) {
                            msgS.toastMessage(msgS.infoMessages[4], 1);
                        } else {
                            var ReceptionEntry = {};
                            ReceptionEntry.receptions = $scope.receptions;
                            ReceptionEntry.CylinderId = receptionEntry.Cylinder.Id;
                            ReceptionEntry.VarietyId = receptionEntry.Variety.Id;
                            ReceptionEntry.ProducerId = receptionEntry.Producer.Id;
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
                Observations: reception.Observations
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
                FieldId: reception.Field.Id,
                CarRegistration: reception.CarRegistration,
                HeatHoursDrying: reception.HeatHoursDrying,
                Observations: reception.Observations,
                Folio: receptionService.Folio
            };
            receptionService.update(receptionService.ReceptionId, ReceptionUpdate).then(function (response) {
                msgS.toastMessage(msgS.successMessages[1], 2);
                $scope.return();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[1], 3);
            });
        }

        $scope.addReceptionToGrill = function (receptionId, checked) {
            if (checked) {
                receptionAndGrillService.addReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[0], 2);
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    msgS.toastMessage(msgS.errorMessages[2], 3);
                });
            } else {
                receptionAndGrillService.removeReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[2], 2);
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    msgS.toastMessage(msgS.errorMessages[4], 3);
                });
            }
        };

        $scope.saveReception = function () {
            $scope.reception.EntryDate = $('#EntryDate').val();
            receptionService.save($scope.reception).then(function (response) {
                $scope.savedSuccesfully = true;
                msgS.toastMessage(msgS.successMessages[0], 2);
                $state.go('receptionManage');
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3], 3);
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
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
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
                } else {
                    $scope.receptions = response.data;
                    response.data.forEach(function (element) {
                        element.IsAlreadyAssigned = element.Grills.indexOf($scope.GrillId) === -1 ? false : true;
                    }, this);
                }
            }, function (response) {
                msgS.msg('err', 5);
            });
        };

        var GetAllFields = function () {
            fieldService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 4);
                } else {
                    $scope.fields = response.data;
                    if ($state.current.name === 'receptionUpdate') {
                        $scope.receptionUpdateModel.Field = SearchItemObj($scope.fields, 'FieldName', receptionService.reception.FieldId);
                    } else {
                        $scope.receptionUpdateModel.Field = $scope.fields[0];
                        $scope.reception.Field = $scope.fields[0];
                    }
                };
            }, function (response) {
                msgS.msg('err', 13);
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
                $scope.receptionUpdateModel.Observations = reception.Observations
        };

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        $scope.generatePDF = function(){
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('receptionTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Recepciones Registradas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:8},
                margin: {horizontal: 10}
            });
            doc.save("RecepcionesRegistradas.pdf");
        };

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
                    GetAllFields();
                    break;
                case 'receptionUpdate':
                    GetAllFields();
                    FillUpdateReceptionObject(receptionService.reception);
                    break;
                default:
                    break;
            }
        })();
    });
})();