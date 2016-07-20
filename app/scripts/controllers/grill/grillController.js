(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillController', function (messageService, $filter, $scope, $state, producerService, varietyService, grillService, receptionAndGrillService, clearService) {
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
        $scope.qualities = [
            { Name: "Primera", Type: 1 },
            { Name: "Segunda", Type: 2 },
            { Name: "Tercera", Type: 3 }
        ];

        $scope.grillU = grillService.grill;
        //$('#grillDate').val($scope.grillU.DateCapture);
        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            clearService.clearReceptionAndGrillService();
            onStateChange();
        });
        $scope.redirectAddSampling = function (grillId) {
            grillService.grillId = grillId;
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
                messageService.toastMessage(messageService.successMessages[1],2);
                $state.go('grillManage');
            }, function (response) {
                messageService.toastMessage(messageService.errorMessage[3],3);
            });
        }

        $scope.saveGrill = function (grill) {
            var Grill = {
                DateCapture: $('#grillDate').val(),
                Size: grill.Size.Type,
                FieldName: grill.FieldName,
                Kilos: grill.Kilos,
                Sacks: grill.Sacks,
                Quality: grill.Quality.Type,
                VarietyId: grill.Variety.Id,
                ProducerId: grill.Producer.Id
            };
            grillService.save(Grill).then(function (response) {
                $scope.savedSuccessfully = true;
                messageService.toastMessage(messageService.successMessages[3],2);
            }, function (response) {
                messageService.toastMessage(messageService.errorMessage[3],3);
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
                    messageService.toastMessage(messageService.successMessages[4],2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = false;
                            return false;
                        }
                    });
                    messageService.toastMessage(messageService.errorMessage[17],3);
                });
            } else {
                grillService.changeStatus(grillId, 0).then(function (response) {
                    messageService.toastMessage(messageService.successMessages[4],2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = true;
                            return false;
                        }
                    });
                    messageService.toastMessage(messageService.errorMessage[17],3);
                });
            }
        };

        $scope.addGrillToReception = function (grillId, checked) {
            if (checked) {
                receptionAndGrillService.addGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    messageService.toastMessage(messageService.successMessages[3],2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    messageService.toastMessage(messageService.errorMessage[18],3);
                });
            } else {
                receptionAndGrillService.removeGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    messageService.toastMessage(messageService.successMessages[2],2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    messageService.toastMessage(messageService.errorMessage[4],3);
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
                messageService.toastMessage(messageService.errorMessage[4],3);
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
                messageService.toastMessage(messageService.errorMessage[4],3);
            });
        };
        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    messageService.toastMessage(messageService.infoMessages[5],1);
                } else {
                    $scope.producers = response.data;
                    $scope.grill.Producer = $scope.producers[0];
                };
            }, function (response) {
                messageService.toastMessage(messageService.errorMessage[8],3);
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    messageService.toastMessage(messageService.infoMessages[7],1);
                } else {
                    $scope.varieties = response.data;
                    $scope.grill.Variety = $scope.varieties[0];
                };
            }, function (response) {
                messageService.toastMessage(messageService.errorMessage[5],3);
            });
        };

        var GetAllGrills = function () {
            grillService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    messageService.toastMessage(messageService.infoMessages[12],1);
                } else {
                    $scope.grills = response.data;
                    response.data.forEach(function (element) {
                        //checks if the reception has the grill key in his grillId field
                        element.IsAlreadyAssigned = element.Receptions.indexOf($scope.ReceptionFolio) === -1 ? false : true;
                    }, this);
                };
            }, function (response) {
                messageService.toastMessage(messageService.errorMessage[15],3);
            });
        };

        (function () {
            switch ($state.current.name) {
                case 'grillAdd':
                    GetAllProducers();
                    GetAllVarieties();
                    break;
                case 'grillManage':
                    GetAllGrills();
                    break;
                default:
                    break;
            };
        })();
    });
})();