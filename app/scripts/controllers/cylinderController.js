(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('cylinderController', function ($scope,messageService, cylinderService) {
        $scope.cylinders = [];
        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.cylinder = {
            CylinderName: ""
        };

        //GetAllCylinders
        (function () {
            cylinderService.getAll().then(function (response) {
                $scope.cylinders = response.data;
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[6],3);
            });
        })();

        $scope.saveCylinder = function () {
            cylinderService.save($scope.cylinder).then(function (response) {
                $scope.savedSuccessfully = true;
                messageService.toastMessage(messageService.successMessages[3],2);
                GetAll();
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[3],3);
            });
        };
        $scope.confirmationDelete =  function(cylinderId){
            swal({
            title: "Estas seguro?",
            text: "Tú eliminaras el cilindro: " + cylinderId +"!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
            },
            function(){
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
                messageService.toastMessage(messageService.errorMessages[4],3);
            });
        };
    });
})();