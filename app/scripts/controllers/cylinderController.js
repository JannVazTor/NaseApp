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
            if (AlreadyExists(cylinderName)){
                msgS.msg('err',39);
            } else {
                cylinderService.save($scope.cylinder).then(function (response) {
                    msgS.toastMessage(msgS.successMessages[3], 2);
                    GetAllCylinders();
                }, function (response) {
                    msgS.toastMessage(msgS.errorMessages[3], 3);
                });
            }
        };

        function AlreadyExists(cylinderName) {
            var exists = false;
            $.each($scope.cylinders, function (i) {
                if ($scope.cylinders[i].CylinderName === cylinderName) {
                    exists = true;
                    return false;
                }
            });
            return exists;
        };

        $scope.confirmationDelete = function (cylinderId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras el cilindro: " + cylinderId + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteCylinder(cylinderId);
                });

        };
        $scope.deleteCylinder = function (cylinderId) {
            cylinderService.delete(cylinderId).then(function (response) {
                swal("Eliminado!", "El registro fue eliminado de manera exitosa.", "success");
                $.each($scope.cylinders, function (i) {
                    if ($scope.cylinders[i].Id === cylinderId) {
                        $scope.cylinders.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
            });
        };
        GetAllCylinders();
    });
})();