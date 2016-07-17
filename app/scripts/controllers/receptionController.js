(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function (toastr, $filter, $scope, $state, receptionService, producerService, cylinderService, varietyService, receptionAndGrillService, clearService) {
        //When the load page
        $scope.selectedRole = {};
        $scope.receptions = [];
        $scope.producers = [];
        $scope.varieties = [];
        $scope.Grills = [];
        //Data shared
        $scope.savedSuccesfully = false;
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.GrillId = receptionAndGrillService.grillId;
        $scope.receptionEntry = [];
        //Init dropdown ReceptionAdd
        $scope.receptionEntry.Cylinder = "";
        $scope.receptionEntry.Variety = "";
        $scope.receptionEntry.Producer = "";

        $scope.receptionU = receptionService.reception;
        // $('#EntryDate').val($scope.receptionU.EntryDate);
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
                    FieldName: reception.FieldName,
                    CarRegistration: reception.CarRegistration,
                    ReceivedFromField: reception.ReceivedFromField,
                    HumidityPercent: reception.HumidityPercent,
                    HeatHoursDrying: reception.HeatHoursDrying,
                    Observations: reception.Observations
                });
            } else {
                toastr.info('La recepcion ya se encuentra agregada y en estado pendiente.');
            }
        };
        $scope.saveReceptionEntry = function (receptionEntry) {
            if ($scope.receptions.length === 0) {
                toastr.info('Debe agregar al menos una recepcion.');
            } else {
                if (!receptionEntry.Cylinder) {
                    toastr.info('No puede agregar si no hay cilindros disponibles.');
                } else {
                    if (!receptionEntry.Variety) {
                        toastr.info('No puede agregar si no hay variedades disponibles.');
                    } else {
                        if (!receptionEntry.Producer) {
                            toastr.info('No puede agregar si no hay productores disponibles.');
                        } else {
                            var ReceptionEntry = {};
                            ReceptionEntry.receptions = $scope.receptions;
                            ReceptionEntry.CylinderId = receptionEntry.Cylinder.Id;
                            ReceptionEntry.VarietyId = receptionEntry.Variety.Id;
                            ReceptionEntry.ProducerId = receptionEntry.Producer.Id;
                            receptionService.saveEntry(ReceptionEntry).then(function (response) {
                                toastr.success('los registros se agrego correctamente.');
                                $scope.receptions = [];
                            }, function (response) {
                                toastr.error('ocurrio un error y los registros no pudieron ser guardados.');
                            });
                        }
                    }
                }
            }
        };
        $scope.redirectAddRemission = function (id, folio) {
            receptionService.ReceptionId = id;
            receptionService.folio = folio;
            $state.go('remissionAdd');
        };
        $scope.redirectUpdate = function (reception) {
            receptionService.reception = reception;
            $state.go('receptionUpdate');
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            clearService.clearReceptionAndGrillService();
            onStateChange();
        });

        $scope.UpdateReception = function () {
            receptionService.update($scope.receptionU.Id, $scope.receptionU).then(function (response) {
                toastr.success('El registro se actualizo correctamente.');
                $state.go('receptionManage');
            }, function (response) {
                toastr.error('ocurrio un error, intentelo de nuevo.');
            });
        }

        $scope.addReceptionToGrill = function (receptionId, checked) {
            if (checked) {
                receptionAndGrillService.addReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    toastr.success('el registro se agrego correctamente.');
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    toastr.error('ocurrio un error y el registro no pudo ser asignado.');
                });
            } else {
                receptionAndGrillService.removeReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    toastr.success('el registro se removio satisfactoriamente');
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    toastr.error('ocurrio un error y el registro no pudo ser removido.');
                });
            }
        };

        $scope.saveReception = function () {
            $scope.reception.EntryDate = $('#EntryDate').val();
            receptionService.save($scope.reception).then(function (response) {
                $scope.savedSuccesfully = true;
                toastr.success('el registro se agrego satisfactoriamente');
                $state.go('receptionManage');
            }, function (response) {
                toastr.error('ocurrio un error y el registro no pudo ser guardado.');
            });
        };
        $scope.confirmationDelete = function (receptionId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras la recepcion: " + receptionId + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteReception(receptionId);
                });

        };

        $scope.deleteReception = function (receptionId) {
            receptionService.delete(receptionId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                toastr.error('Ocurrio un error al intentar eliminar el registro.');
            });
        };

        $scope.redirectAddHumidity = function (receptionId, cylinderName) {
            receptionService.CylinderName = cylinderName;
            receptionService.ReceptionId = receptionId;
            $state.go('humidity');
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) toastr.info('No se econtraron productores en la base de datos');
                $scope.producers = response.data;
                $scope.receptionEntry.Producer = $scope.producers[0];
            }, function (response) {
                toastr.error('ocurrio un error al intentar cargar a los productores.');
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) toastr.info('No se econtraron variedades en la base de datos');
                $scope.varieties = response.data;
                $scope.receptionEntry.Variety = $scope.varieties[0];
            }, function (response) {
                toastr.error('ocurrio un error al intentar cargar las variedades.');
            });
        };

        var GetAllCylinders = function () {
            cylinderService.getAll().then(function (response) {
                if (response.data.length === 0) toastr.info('No se econtraron cilindros en la base de datos');
                $scope.cylinders = response.data;
                $scope.receptionEntry.Cylinder = $scope.cylinders[0];
            }, function (response) {
                toastr.error('ocurrio un error al intentar cargar los cilindros.');
            });
        };

        var GetAllReceptions = function () {
            receptionService.getAll().then(function (response) {
                if (response.data.length === 0) toastr.info('No se econtraron recepciones en la base de datos.');
                $scope.receptions = response.data;
                response.data.forEach(function (element) {
                    element.IsAlreadyAssigned = element.Grills.indexOf($scope.GrillId) === -1 ? false : true;
                }, this);
            }, function (response) {
                toastr.error('la obtencion de las recepciones fallo');
            });
        };

        function defaultReception() {
            $scope.reception.ID = "";
            $scope.reception.Variety = "";
            $scope.reception.ReceivedFromField = "";
            $scope.reception.CylinderId = "";
            $scope.reception.FieldName = "";
            $scope.reception.CarRegistration = "";
            $scope.reception.HeatHoursDrying = "";
            $scope.reception.HumidityPercent = "";
            $scope.reception.Observations = "";
            $scope.reception.ProducerId = "";
            $scope.reception.Folio = "";
        };

        (function () {
            switch ($state.current.name) {
                case 'receptionManage':
                    GetAllReceptions();
                    break;
                case 'receptionAdd':
                    GetAllProducers();
                    GetAllCylinders();
                    GetAllVarieties();
                    break;
                default:
                    break;
            }
        })();
    });
})();