(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function (toastr, $scope, $state, receptionService, producerService, cylinderService, receptionAndGrillService, clearService) {
        //When the load page
        $scope.selectedRole = {};
        $scope.receptions = [];
        $scope.producers = [];
        $scope.Grills = [];
        //Data shared
        $scope.savedSuccesfully = false;
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.GrillId = receptionAndGrillService.grillId;
        //Object model
        $scope.reception = {
            Variety: "",
            ReceivedFromField: "",
            CylinderId: "",
            FieldName: "",
            CarRegistration: "",
            HeatHoursDrying: "",
            HumidityPercent: "",
            Observations: "",
            ProducerId: "",
            EntryDate: ""
        };
        $scope.receptionU = receptionService.reception;
         $('#EntryDate').val($scope.receptionU.EntryDate);
        $scope.redirectReceptionToGrill = function(receptionFolio, receptionId){
            receptionAndGrillService.IsGrillToReception = true;
            receptionAndGrillService.receptionId = receptionId;
            receptionAndGrillService.receptionFolio = receptionFolio;
            $state.go('grillManage');
        };
         $scope.redirectAddRemission = function (id,folio) {
            receptionService.ProducerId = id;
            receptionService.folio = folio;
            
            $state.go('remissionAdd');
        };
        $scope.redirectUpdate = function (reception) {
            receptionService.reception = reception;
            $state.go('receptionUpdate');
        };

        var onStateChange = $scope.$on('$locationChangeStart',function(event, newUrl, oldUrl){
            clearService.clearReceptionAndGrillService();
            onStateChange();
        });

        $scope.UpdateReception = function () {
            receptionService.update($scope.receptionU.Id, $scope.receptionU).then(function (response) {
                $scope.message = "El registro fue Actualizado  de manera exitosa."
                $state.go('receptionManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
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
                $state.go('receptionManage');
            }, function (response) {
                $scope.message = "ocurrio un error y el registro no pudo ser guardado."
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

        var GetAllCylinders = function () {
            cylinderService.getAll().then(function (response) {
                $scope.cylinders = response.data;
            }, function (response) {
                $scope.message = "la obtencion de cilindros fallo.";
            });
        };

        var GetAllReceptions = function () {
            receptionService.getAll().then(function (response) {
                $scope.receptions = response.data;
                response.data.forEach(function (element) {
                    element.IsAlreadyAssigned = element.Grills.indexOf($scope.GrillId) === -1 ? false : true;
                }, this);
            }, function (response) {
                $scope.message = "la obtencion de las recepciones fallo";
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

        }
        GetAllReceptions();
        GetAllProducers();
        GetAllCylinders();
    });
})();