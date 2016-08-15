(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillController', function (msgS, $filter, $scope, $state, fieldService, producerService, varietyService, grillService, receptionAndGrillService, clearService, $rootScope) {
        $scope.message = "";
        $scope.grills = [];
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.ReceptionId = receptionAndGrillService.receptionId;
        $scope.ReceptionFolio = receptionAndGrillService.receptionFolio;
        $scope.grill = {
            Producer: {},
            Field: {},
            Variety: {}
        };

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

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'grillUpdate') {
                clearService.clearReceptionAndGrillService();
                clearService.clearGrillService();
                onStateChange();
            }
        });

        $scope.redirectAddSampling = function (grillId) {
            grillService.grillId = grillId;
            $state.go('samplingAdd');
        };
        $scope.redirectUpdate = function (grillId, grill) {
            grillService.grillId = grillId;
            grillService.grill = {
                DateCapture: grill.DateCapture,
                Size: grill.Size,
                FieldId: grill.FieldName,
                Kilos: grill.Kilos,
                Sacks: grill.Sacks,
                Quality: grill.Quality,
                VarietyId: grill.Variety,
                ProducerId: grill.Producer
            };
            $state.go('grillUpdate');
        };

        $scope.UpdateGrill = function (grill) {
            var GrillUpdate = {
                DateCapture: $('#EntryDate').val(),
                Size: grill.Size.Type,
                FieldId: grill.Field.Id,
                Kilos: grill.Kilos,
                Sacks: grill.Sacks,
                Quality: grill.Quality.Type,
                VarietyId: grill.Variety.Id,
                ProducerId: grill.Producer.Id
            };
            grillService.update(grillService.grillId, GrillUpdate).then(function (response) {
                msgS.toastMessage(msgS.successMessages[1], 2);
                $state.go($rootScope.prevState);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3], 3);
            });
        }

        $scope.saveGrill = function (grill) {
            if ($scope.grill.Producer === null) {
                msgS.msg('err', 31);
            } else {
                if ($scope.grill.Field === null) {
                    msgS.msg('err', 32);
                } else {
                    if ($scope.grill.Variety === null) {
                        msgS.msg('err', 33);
                    } else {
                        var Grill = {
                            DateCapture: $('#EntryDate').val(),
                            Size: grill.Size.Type,
                            FieldId: grill.Field.Id,
                            Kilos: grill.Kilos,
                            Sacks: grill.Sacks,
                            Quality: grill.Quality.Type,
                            VarietyId: grill.Variety.Id,
                            ProducerId: grill.Producer.Id
                        };
                        grillService.save(Grill).then(function (response) {
                            msgS.toastMessage(msgS.successMessages[3], 2);
                        }, function (response) {
                            msgS.toastMessage(msgS.errorMessages[3], 3);
                        });
                    }
                }
            }
        };

        $scope.redirectReceptionToGrill = function (Id) {
            receptionAndGrillService.IsGrillToReception = true;
            receptionAndGrillService.grillId = Id;
            $state.go('receptionManage');
        };

        $scope.changeStatus = function (status, grillId) {
            if (status) {
                grillService.changeStatus(grillId, 1).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[4], 2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = false;
                            return false;
                        }
                    });
                    msgS.toastMessage(msgS.errorMessages[17], 3);
                });
            } else {
                grillService.changeStatus(grillId, 0).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[4], 2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].Status = true;
                            return false;
                        }
                    });
                    msgS.toastMessage(msgS.errorMessages[17], 3);
                });
            }
        };

        $scope.addGrillToReception = function (grillId, checked) {
            if (checked) {
                receptionAndGrillService.addGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[3], 2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = false;
                            return false;
                        }
                    });
                    msgS.toastMessage(msgS.errorMessages[18], 3);
                });
            } else {
                receptionAndGrillService.removeGrillToReception(grillId, $scope.ReceptionId).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[2], 2);
                }, function (response) {
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Id === grillId) {
                            $scope.grills[i].IsAlreadyAssigned = true;
                            return false;
                        }
                    });
                    msgS.toastMessage(msgS.errorMessages[4], 3);
                });
            }
        };

        $scope.confirmationDelete = function (grillId) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar la parrilla con el numero " + grillId + " ?"),
                function () {
                    deleteGrill(grillId);
                });

        };

        $scope.generatePDF = function(){
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('grillManageTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Parrillas Procesadas');
            doc.autoTable(res.columns, res.data, {
                startY: 60,
                headerStyles: {fontSize:6},
                margin: {horizontal: 10}
            });
            doc.save("ParrillasProcesadas.pdf");
        };
        var deleteGrill = function (grillId) {
            grillService.delete(grillId).then(function (response) {
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Id === grillId) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
            });
        };

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[5], 1);
                } else {
                    $scope.producers = response.data;
                    if ($state.current.name === 'grillUpdate') {
                        $scope.grill.Producer = SearchItemObj($scope.producers, 'ProducerName', grillService.grill.ProducerId);
                    } else {
                        $scope.grill.Producer = $scope.producers[0];
                    }
                };
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8], 3);
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[7], 1);
                } else {
                    $scope.varieties = response.data;
                    if ($state.current.name === 'grillUpdate') {
                        $scope.grill.Variety = SearchItemObj($scope.varieties, 'VarietyName', grillService.grill.VarietyId);
                    } else {
                        $scope.grill.Variety = $scope.varieties[0];
                    }
                };
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[5], 3);
            });
        };

        var GetAllFields = function (defaultItem) {
            fieldService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 4);
                } else {
                    $scope.fields = response.data;
                    if ($state.current.name === 'grillUpdate') {
                        $scope.grill.Field = SearchItemObj($scope.fields, 'FieldName', grillService.grill.FieldId);
                    } else {
                        $scope.grill.Field = $scope.fields[0];
                    }
                };
            }, function (response) {
                msgS.msg('err', 13);
            });
        };

        var GetAllGrillsCurrentInv = function () {
            grillService.getAllCurrentInv().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 7);
                } else {
                    $scope.grills = response.data;
                }
            }, function (response) {
                msgS.msg('err', 19);
            });
        };

        var GetAllGrills = function () {
            grillService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[12], 1);
                } else {
                    $scope.grills = response.data;
                    response.data.forEach(function (element) {
                        //checks if the reception has the grill key in his grillId field
                        element.IsAlreadyAssigned = element.Receptions.indexOf($scope.ReceptionFolio) === -1 ? false : true;
                    }, this);
                };
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[15], 3);
            });
        };

        function FillUpdateGrillObject(grillU) {
            $scope.grill.Kilos = grillU.Kilos;
            $scope.grill.Sacks = grillU.Sacks;
            $scope.grill.Size = SearchItemObj($scope.sizes, 'Name', grillU.Size);
            $scope.grill.Quality = SearchItemObj($scope.qualities, 'Name', grillU.Quality);
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

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };
        
        (function () {
            switch ($state.current.name) {
                case 'grillAdd':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    GetAllProducers();
                    GetAllVarieties();
                    GetAllFields();
                    break;
                case 'grillManage':
                    GetAllGrills();
                    break;
                case 'grillCurrentInv':
                    GetAllGrillsCurrentInv();
                    break;
                case 'grillUpdate':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    GetAllProducers();
                    GetAllVarieties();
                    GetAllFields();
                    FillUpdateGrillObject(grillService.grill);
                    break;
                default:
                    break;
            };
        })();
    });
})();