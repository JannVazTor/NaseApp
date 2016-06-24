(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('cylinderController', function ($scope, cylinderService) {
        $scope.cylinders = [];
        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.cylinder = {
            CylinderName: ""
        };

        var GetAll = function () {
            cylinderService.getAll().then(function (response) {
                $scope.cylinders = response.data;
            }, function (response) {
                $scope.message = "la obtencion de los cilindros fallo";
            });
        };
        GetAll();
        $scope.saveCylinder = function () {
            cylinderService.save($scope.cylinder).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "El registro a sigo guardado de manera exitosa."
                GetAll();
            }, function (response) {
                $scope.message = "No se pudo guardar el cilindro";
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
                $scope.message = "El registro se elimino de manera exitosa.";
                swal("Eliminado!", "El registro fue eliminado de manera exitosa.", "success");
                $.each($scope.cylinders, function (i) {
                    if ($scope.cylinders[i].Id === cylinderId) {
                        $scope.cylinders.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error y el registro no pudo ser eliminado.";
            });
        };
    });
})();