(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillController', function (toastr, $filter, $scope, $state, producerService, varietyService, grillService, receptionAndGrillService, clearService) {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.grills = [];
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.ReceptionId = receptionAndGrillService.receptionId;
        $scope.ReceptionFolio = receptionAndGrillService.receptionFolio;
        $scope.producers = [];

        $scope.sizes = [
            { Name: "Grande", Type: 1 },
            { Name: "Mediana", Type: 2 },
            { Name: "Chica", Type: 3 }
        ];

        $scope.grillU = grillService.grill;
        //$('#grillDate').val($scope.grillU.DateCapture);
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

        $scope.UpdateGrill = function () {
            $scope.grillU.DateCapture = $('#grillDate').val();
            grillService.update(grillService.id, $scope.grillU).then(function (response) {
                toastr.success('El registro fue Actualizado  de manera exitosa.');
                $state.go('grillManage');
            }, function (response) {
                toastr.error('ocurrio un error y el registro no pudo ser guardado.');
            });
        }

        $scope.saveGrill = function (grill) {
            var Grill = {
                DateCapture: $('#grillDate').val(),
                Size: $scope.grill.Size.Type,
                FieldName: grill.FieldName,
                Kilos: grill.Kilos,
                Sacks: grill.Sacks,
                Quality: grill.Quality,
                Variety: grill.Variety.VarietyName,
                Producer: grill.Producer.ProducerName
            };
            grillService.save(Grill).then(function (response) {
                $scope.savedSuccessfully = true;
                toastr.success('La parrilla a sido guardada de manera exitosa');
            }, function (response) {
                toastr.error('No se pudo guardar el registro.');
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
                    toastr.success('el status se cambio correctamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = false;
                            return false;
                        }
                    });
                    toastr.error('ocurrio un error y el status no pudo ser cambiado.');
                });
            } else {
                grillService.changeStatus(grillId, 0).then(function (response) {
                    toastr.success('el status se cambio correctamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = true;
                            return false;
                        }
                    });
                    toastr.error('ocurrio un error y el status no pudo ser cambiado.');
                });
            }
        };

        $scope.addGrillToReception = function (grillId, checked) {
            if (checked) {
                receptionAndGrillService.addGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    toastr.success('eL registro se agrego correctamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    toastr.error('ocurrio un error y el registro no pudo ser asignado.');
                });
            } else {
                receptionAndGrillService.removeGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    toastr.success('el registro se removio satisfactoriamente.');
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    toastr.error('ocurrio un error y el registro no pudo ser removido.');
                });
            }
        };

        $scope.deleteGrill = function (grillId) {
            grillService.delete(grillId).then(function (response) {
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Id === grillId) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                toastr.error('Ocurrio un error al intentar eliminar el registro.');
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
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Id === grillId) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                toastr.error('Ocurrio un error al intentar eliminar el registro.');
            });
        };
        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se econtraron productores en la base de datos')
                } else {
                    $scope.producers = response.data;
                    $scope.grill.Producer = $scope.producers[0];
                };
            }, function (response) {
                toastr.error('la obtencion de productores fallo.');
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se econtraron variedades en la base de datos')
                } else {
                    $scope.varieties = response.data;
                    $scope.grill.Variety = $scope.varieties[0];
                };
            }, function (response) {
                toastr.error('ocurrio un error al intentar cargar las variedades.');
            });
        };

        var GetAllGrills = function () {
            grillService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    toastr.info('No se econtraron parrillas en la base de datos')
                } else {
                    $scope.grills = response.data;
                    response.data.forEach(function (element) {
                        //checks if the reception has the grill key in his grillId field
                        element.IsAlreadyAssigned = element.Receptions.indexOf($scope.ReceptionFolio) === -1 ? false : true;
                    }, this);
                };
            }, function (response) {
                toastr.error('la obtencion de parrillas fallo.');
            });
        };
        var chargeGrillAddData = function () {
            if ($state.current.name === 'grillAdd') {
                GetAllProducers();
                GetAllVarieties();
            }
        };
        var chargeManageGrillData = function(){
            if($state.current.name === 'grillManage'){
                GetAllGrills();
            }
        };
        chargeGrillAddData();
        chargeManageGrillData();
    });
})();