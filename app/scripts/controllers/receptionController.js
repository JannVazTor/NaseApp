(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function (toastr, messageService, $filter, $scope, $state, receptionService, producerService, cylinderService, varietyService, receptionAndGrillService, clearService) {
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
                messageService.toastMessage(messageService.infoMessages[1], 1);
            }
        };
        $scope.saveReceptionEntry = function (receptionEntry) {
            if ($scope.receptions.length === 0) {
                messageService.toastMessage(messageService.infoMessages[0], 1);
            } else {
                if (!receptionEntry.Cylinder) {
                    messageService.toastMessage(messageService.infoMessages[2], 1);
                } else {
                    if (!receptionEntry.Variety) {
                        messageService.toastMessage(messageService.infoMessages[3], 1);
                    } else {
                        if (!receptionEntry.Producer) {
                            messageService.toastMessage(messageService.infoMessages[4], 1);
                        } else {
                            var ReceptionEntry = {};
                            ReceptionEntry.receptions = $scope.receptions;
                            ReceptionEntry.CylinderId = receptionEntry.Cylinder.Id;
                            ReceptionEntry.VarietyId = receptionEntry.Variety.Id;
                            ReceptionEntry.ProducerId = receptionEntry.Producer.Id;
                            receptionService.saveEntry(ReceptionEntry).then(function (response) {
                                messageService.toastMessage(messageService.successMessages[0], 1);
                                $scope.receptions = [];
                            }, function (response) {
                                messageService.toastMessage(messageService.errorMessages[0], 1);
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
                messageService.toastMessage(messageService.successMessages[1], 2);
                $state.go('receptionManage');
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[1], 3);
            });
        }

        $scope.addReceptionToGrill = function (receptionId, checked) {
            if (checked) {
                receptionAndGrillService.addReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    messageService.toastMessage(messageService.successMessages[0], 2);
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    messageService.toastMessage(messageService.errorMessages[2], 3);
                });
            } else {
                receptionAndGrillService.removeReceptionToGrill(receptionId, $scope.GrillId).then(function (response) {
                    messageService.toastMessage(messageService.successMessages[2], 2);
                }, function (response) {
                    $.each($scope.receptions, function (i) {
                        if ($scope.receptions[i].Id === receptionId) {
                            $scope.receptions[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    messageService.toastMessage(messageService.errorMessages[4], 3);
                });
            }
        };

        $scope.saveReception = function () {
            $scope.reception.EntryDate = $('#EntryDate').val();
            receptionService.save($scope.reception).then(function (response) {
                $scope.savedSuccesfully = true;
                messageService.toastMessage(messageService.successMessages[0], 2);
                $state.go('receptionManage');
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[3], 3);
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
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[4], 3);
            });
        };

        $scope.redirectAddHumidity = function (receptionId, cylinderName) {
            receptionService.CylinderName = cylinderName;
            receptionService.ReceptionId = receptionId;
            $state.go('humidity');
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) 
                     messageService.toastMessage(messageService.infoMessages[5], 1);   

                $scope.producers = response.data;
                $scope.receptionEntry.Producer = $scope.producers[0];
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[7], 3);
      
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) 
                     messageService.toastMessage(messageService.infoMessages[7], 1);
              
                $scope.varieties = response.data;
                $scope.receptionEntry.Variety = $scope.varieties[0];
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[5], 3);
               
            });
        };

        var GetAllCylinders = function () {
            cylinderService.getAll().then(function (response) {
                if (response.data.length === 0) 
                messageService.toastMessage(messageService.infoMessages[8], 1);
               
                $scope.cylinders = response.data;
                $scope.receptionEntry.Cylinder = $scope.cylinders[0];
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[6], 3);
                
            });
        };

        var GetAllReceptions = function () {
            receptionService.getAll().then(function (response) {
                if (response.data.length === 0) 
                    messageService.toastMessage(messageService.infoMessages[6], 1);
                
                $scope.receptions = response.data;
                response.data.forEach(function (element) {
                    element.IsAlreadyAssigned = element.Grills.indexOf($scope.GrillId) === -1 ? false : true;
                }, this);
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[7], 3);
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