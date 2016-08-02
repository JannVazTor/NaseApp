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
            swal({
            title: "Estas seguro?",
            text: "Tú eliminaras la selección: " + selectionId +"!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
            },
            function(){
                $scope.deleteSelection(selectionId);
            });
            
        };
        $scope.deleteSelection = function (selectionId) {
            selectionService.delete(selectionId).then(function (response) {
                $scope.message = "El registro se elimino de manera exitosa.";
                swal("Eliminado!", "El registro fue eliminado de manera exitosa.", "success");
                $.each($scope.selections, function (i) {
                    if ($scope.selections[i].Id === selectionId) {
                        $scope.selections.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error y el registro no pudo ser eliminado.";
            });
        };
        GetAll();
    });
})();