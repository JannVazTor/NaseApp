(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('selectionController', function ($scope, selectionService) {
        $scope.selections = [];
        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.selection = {
            First: "",
            Second: "",
            Third : "",
            Broken : "",
            Germinated : "",
            Vanas : "",
            WithNut : "",
            NutColor : "",
            NutPerformance : "",
            GerminationStart : "",
            SampleWeight : "",
            NutsNumber : "",
            Humidity : ""
        };

        var GetAll = function () {
            selectionService.getAll().then(function (response) {
                $scope.selections = response.data;
            }, function (response) {
                $scope.message = "la obtencion de las selecciones fallo";
            });
        };
        GetAll();

        $scope.saveSelection = function () {
            selectionService.save($scope.selection).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "El registro a sido guardado de manera exitosa."
                GetAll();
            }, function (response) {
                $scope.message = "No se pudo guardar la selección";
            });
        };
        $scope.confirmationDelete =  function(selectionId){
            swal(msgS.swalConfig("¿Esta seguro que desea eliminar la seleccion con el id "+selectionId+"?"),
            function(){
                $scope.deleteSelection(selectionId);
            });
        };
        $scope.deleteSelection = function (selectionId) {
            selectionService.delete(selectionId).then(function (response) {
                $.each($scope.selections, function (i) {
                    if ($scope.selections[i].Id === selectionId) {
                        $scope.selections.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess;
            }, function (response) {
                $scope.message = "Ocurrio un error y el registro no pudo ser eliminado.";
            });
        };
        GetAll();
    });
})();