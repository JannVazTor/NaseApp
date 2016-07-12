(function () {
    'use strict'
angular.module('naseNutAppApp').controller('receptionController', function (toastr, $scope, $state, receptionService, producerService, cylinderService, varietyService, receptionAndGrillService, clearService) {
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

        $scope.receptionU = receptionService.reception;
        // $('#EntryDate').val($scope.receptionU.EntryDate);
        $scope.redirectReceptionToGrill = function (receptionFolio, receptionId) {
            receptionAndGrillService.IsGrillToReception = true;
            receptionAndGrillService.receptionId = receptionId;
            receptionAndGrillService.receptionFolio = receptionFolio;
            $state.go('grillManage');
        };
        $scope.addReception = function (reception) {
            $scope.reception.EntryDate = $('#EntryDate').val();
            if ($scope.receptions.indexOf(reception) === -1) {
                $scope.receptions.push(reception);
            } else {
                toastr.info('La recepcion ya se encuentra agregada en estado pendiente.');
            }
        };
        $scope.saveReceptionEntry = function (receptionEntry) {
            if ($scope.receptions.length === 0) {
                toastr.info('Debe agregar al menos una recepcion.')
            } else {
                var ReceptionEntry = {};
                ReceptionEntry.receptions = $scope.receptions;
                ReceptionEntry.CylinderId = receptionEntry.CylinderId;
                ReceptionEntry.VarietyId = receptionEntry.VarietyId;
                ReceptionEntry.ProducerId = receptionEntry.ProducerId;
                receptionService.saveEntry(ReceptionEntry).then(function (response) {
                    toastr.success('los registros se agrego correctamente.');
                }, function (response) {
                    toastr.error('ocurrio un error y los registros no pudieron ser guardados.');
                });
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
            }, function (response) {
                toastr.error('la obtencion de productores fallo.');
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) toastr.info('No se econtraron variedades en la base de datos');
                $scope.varieties = response.data;
            }, function (response) {
                toastr.error('ocurrio un error al intentar cargar las variedades.');
            });
        };

        var GetAllCylinders = function () {
            cylinderService.getAll().then(function (response) {
                if (response.data.length === 0) toastr.info('No se econtraron cilindros en la base de datos');
                $scope.cylinders = response.data;
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

        var chargeReceptionAddData = function () {
            if ($state.current.name === 'receptionAdd') {
                GetAllProducers();
                GetAllCylinders();
                GetAllVarieties();
            }
        };
        var chargeReceptionManageData = function () {
            if ($state.current.name === 'receptionManage') {
                GetAllReceptions();
            }
        };

        chargeReceptionAddData();
        chargeReceptionManageData();
    });
})();