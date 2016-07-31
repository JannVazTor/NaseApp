(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('remissionController', function ($scope, msgS, toastr, $state, remissionService, receptionService) {
        $scope.remissions = [];
        $scope.message = "";
        $scope.folio = receptionService.folio;
        $scope.remission = {};

        $scope.saveRemission = function (remission) {
            var Remission = {
                Cultivation: remission.Cultivation,
                Batch: remission.Batch,
                Quantity: remission.Quantity,
                Butler: remission.Butler,
                TransportNumber: remission.TransportNumber,
                Driver: remission.Driver,
                Elaborate: remission.Elaborate,
                ReceptionId: receptionService.ReceptionId
            };
            remissionService.save(Remission).then(function (response) {
                msgS.toastMessage(msgS.successMessages[0], 2);
                ClearForm();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3], 3);
            });
        };

        function ClearForm(){
            $scope.remission = {};
            $scope.remissionForm.$setPristine();
            $scope.remissionForm.$setUntouched();
        };

        $scope.redirectUpdate = function (remission) {
            remissionService.remission = remission;
            $state.go('remissionUpdate');
        };

        $scope.UpdateRemission = function () {
            remissionService.update($scope.remission.Id, $scope.remission).then(function (response) {
                msgS.toastMessage(msgS.successMessages[1], 2);
                defaultRemission();
                $state.go('remissionManage');
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[9], 3);
            });
        }

        $scope.confirmationDelete = function (remissionId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras la remisión: " + remissionId + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteRemission(remissionId);
                });

        };
        $scope.deleteRemission = function (remissionId) {
            remissionService.delete(remissionId).then(function (response) {
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.remissions, function (i) {
                    if ($scope.remissions[i].Id === remissionId) {
                        $scope.remissions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
            });
        };

        $scope.redirectToReception = function () {
            $state.go('receptionManage');
        };

        var GetAllRemissions = function () {
            remissionService.getAll().then(function (response) {
                $scope.remissions = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[10], 3);
            });
        };

        (function () {
            switch ($state.current.name) {
                case 'remissionManage':
                    GetAllRemissions();
                    break;
                default:
                    break;
            };
        })();

        function defaultRemission() {
            remissionService.remission.Id = "";
            remissionService.remission.Cultivation = "";
            remissionService.remission.Batch = "";
            remissionService.remission.Quantity = "";
            remissionService.remission.Butler = "";
            remissionService.remission.TransportNumber = "";
            remissionService.remission.Driver = "";
            remissionService.remission.Elaborate = "";
            remissionService.remission.ReceptionId = receptionService.ReceptionId;
            $scope.remission = remissionService.remission;
        };
    });
})();