(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('remissionController', function ($filter, $scope, msgS, toastr, $state, remissionService, clearService, receptionService, $rootScope) {
        $scope.remissions = [];
        $scope.message = "";
        $scope.folio = receptionService.folio;
        $scope.remission = {};

        $scope.saveRemission = function (remission) {
            var Remission = {
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

        function ClearForm() {
            $scope.remission = {};
            $scope.remissionForm.$setPristine();
            $scope.remissionForm.$setUntouched();
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'remissionUpdate') {
                clearService.clearRemissionService();
                onStateChange();
            }
        });

        $scope.redirectUpdate = function (remission, receptionId) {
            receptionService.ReceptionId = receptionId;
            remissionService.remission = {
                Id: remission.Id,
                Quantity: remission.Quantity,
                Butler: remission.Butler,
                TransportNumber: remission.TransportNumber,
                Driver: remission.Driver,
                Elaborate: remission.Elaborate
            };
            $state.go('remissionUpdate');
        };

        $scope.updateRemission = function (remission) {
            var Remission = {
                Quantity: remission.Quantity,
                Butler: remission.Butler,
                TransportNumber: remission.TransportNumber,
                Driver: remission.Driver,
                Elaborate: remission.Elaborate
            };
            remissionService.update(remissionService.remission.Id, Remission).then(function (response) {
                msgS.toastMessage(msgS.successMessages[1], 2);
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

        var GetAllRemissions = function () {
            remissionService.getAll().then(function (response) {
                $scope.remissions = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[10], 3);
            });
        };

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        function FillUpdateRemissionObject(remissionUpdateModel) {
            $scope.remission.Id = remissionUpdateModel.Id
            $scope.remission.Quantity = remissionUpdateModel.Quantity,
                $scope.remission.Butler = remissionUpdateModel.Butler,
                $scope.remission.TransportNumber = remissionUpdateModel.TransportNumber,
                $scope.remission.Driver = remissionUpdateModel.Driver,
                $scope.remission.Elaborate = remissionUpdateModel.Elaborate
        };

        (function () {
            switch ($state.current.name) {
                case 'remissionManage':
                    GetAllRemissions();
                    break;
                case 'remissionUpdate':
                    FillUpdateRemissionObject(remissionService.remission);
                    break;
                case 'remissionAdd':
                    $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    break;
                default:
                    break;
            };
        })();
    });
})();