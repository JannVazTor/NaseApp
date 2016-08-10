(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('cylinderController', function ($scope, msgS, cylinderService) {
        $scope.cylinders = [];
        $scope.message = "";

        $scope.changeState = function (id, state) {
            cylinderService.changeState(id, state).then(function (response) {
                msgS.msg('succ', 6);
            }, function (response) {
                $.each($scope.cylinders, function (i) {
                    if ($scope.cylinders[i].Id === id) {
                        $scope.cylinders[i].State = state;
                        return false;
                    }
                });
                msgS.msg('err', 22);
            });
        };

        var GetAllCylinders = function () {
            cylinderService.getAll().then(function (response) {
                $scope.cylinders = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[6], 3);
            });
        };

        $scope.saveCylinder = function (cylinderName) {
            var Cylinder = {
                CylinderName: cylinderName
            };
            cylinderService.save(Cylinder).then(function (response) {
                msgS.msg('succ', 14);
                GetAllCylinders();
            }, function (response) {
                if (response.status === 409) {
                    msgS.msg('err', 39);
                } else {
                    msgS.msg('err', 49);
                }
            });
        };

        $scope.confirmationDelete = function (cylinderId, cylinderName) {
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar el cilindro " + cylinderName + "?"),
                function () {
                    deleteCylinder(cylinderId);
                });
        };
        var deleteCylinder = function (cylinderId) {
            cylinderService.delete(cylinderId).then(function (response) {
                $.each($scope.cylinders, function (i) {
                    if ($scope.cylinders[i].Id === cylinderId) {
                        $scope.cylinders.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
            });
        };
        GetAllCylinders();
    });
})();