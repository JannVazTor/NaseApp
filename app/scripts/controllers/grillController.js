(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillController', function ($filter, $scope, $mdToast, $state, producerService, grillService, receptionAndGrillService, clearService) {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.grills = [];
        $scope.IsGrillToReception = receptionAndGrillService.IsGrillToReception;
        $scope.ReceptionId = receptionAndGrillService.receptionId;
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

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            clearService.clearReceptionAndGrillService();
            onStateChange();
        });

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

        $scope.addGrillToReception = function (grillId, checked) {
            if (checked) {
                receptionAndGrillService.addGrillToReception(grillId, receptionAndGrillService.receptionId).then(function (response) {
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
                receptionAndGrillService.removeGrillToReception(grillId, receptionAndGrillService.receptionId).then(function (response) {
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
                    element.IsAlreadyAssigned = element.Receptions.indexOf($scope.ReceptionId) === -1 ? false : true;
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