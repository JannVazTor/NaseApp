(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillController', function ($filter, $scope, $state, producerService, grillService, receptionAndGrillService, clearService) {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.grills = [];
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.ReceptionId = receptionAndGrillService.receptionId;
        $scope.ReceptionFolio = receptionAndGrillService.receptionFolio;
        $scope.grill = {
            DateCapture: "",
            Size: "",
            Sacks: "",
            Kilos: "",
            Quality: "",
            Variety: "",
            Producer: "",
            FieldName: ""
        };
        
        $scope.grillU = grillService.grill;
        $('#grillDate').val($scope.grillU.DateCapture); 
        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            clearService.clearReceptionAndGrillService();
            onStateChange();
        });
        $scope.redirectAddSampling = function (grillId) {
            grillService.id = grillId;
            $state.go('samplingAdd');
        };
         $scope.redirectUpdate = function (grillId, grill) {
            grillService.id = grillId;
            grillService.grill = grill;
            $state.go('grillUpdate');
        };
        
        $scope.UpdateGrill= function () {
            $scope.grillU.DateCapture = $('#grillDate').val();
            grillService.update(grillService.id, $scope.grillU).then(function (response) {
                $scope.message = "El registro fue Actualizado  de manera exitosa."
                $state.go('grillManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
            });
        }

        $scope.saveGrill = function () {
            $scope.grill.DateCapture = $('#grillDate').val();
            grillService.save($scope.grill).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "La parrilla a sido guardada de manera exitosa";
            }, function (response) {
                $scope.message = "No se pudo guardar el registro";
            });
        };

        $scope.redirectReceptionToGrill = function (Id) {
            receptionAndGrillService.IsGrillToReception = true;
            receptionAndGrillService.grillId = Id;
            $state.go('receptionManage');
        };

        $scope.changeStatus = function (status, grillId) {
            if (status) {
                grillService.changeStatus(grillId, 1).then(function (response) {
                    ShowSimpleToast('El status se cambio correctamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = false;
                            return false;
                        }
                    });
                    ShowSimpleToast('Ocurrio un error y el registro no pudo ser asignado.');
                });
            } else {
                grillService.changeStatus(grillId, 0).then(function (response) {
                    ShowSimpleToast('El status se cambio correctamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = true;
                            return false;
                        }
                    });
                    ShowSimpleToast('Ocurrio un error y el registro no pudo ser asignado.');
                });
            }
        };

        $scope.addGrillToReception = function (grillId, checked) {
            if (checked) {
                receptionAndGrillService.addGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    ShowSimpleToast('EL registro se agrego correctamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    ShowSimpleToast('Ocurrio un error y el registro no pudo ser asignado.');
                });
            } else {
                receptionAndGrillService.removeGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    ShowSimpleToast('el registro se removio satisfactoriamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    ShowSimpleToast('Ocurrio un error y el registro no pudo ser removido.')
                });
            }
        };

        $scope.deleteGrill = function (grillId) {
            grillService.delete(grillId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Id === grillId) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error al intentar eliminar el registro.";
            });
        };
        $scope.confirmationDelete = function (grillId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras la recepcion: " + grillId + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteGrill(grillId);
                });

        };

        $scope.deleteGrill = function (grillId) {
            grillService.delete(grillId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Id === grillId) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error al intentar eliminar el registro.";
            });
        };
        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                $scope.message = "la obtencion de productores fallo.";
            });
        };

        var GetAllGrills = function () {
            grillService.getAll().then(function (response) {
                $scope.grills = response.data;
                response.data.forEach(function (element) {
                    element.IsAlreadyAssigned = element.Receptions.indexOf($scope.ReceptionFolio) === -1 ? false : true;
                }, this);
            }, function (response) {
                $scope.message = "la obtencion de parrillas fallo.";
            });
        };

        var ShowSimpleToast = function (text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('bottom right')
                    .hideDelay(2000)
            );
        };

        GetAllGrills();
        GetAllProducers();
    });
})();