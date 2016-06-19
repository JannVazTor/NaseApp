(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('receptionController', function ($scope, receptionService) {
        $scope.selectedRole = {};
        $scope.receptions = [];
        $scope.reception = {
            Variety: "",
            ReceivedFromField: "",
            CylinderNumber: "",
            FieldName: "",
            CarRegistration: "",
            HeatHoursDrying: "",
            HumidityPercent: "",
            Observations: "",
            ProducerId: ""
        };

        $scope.saveReception = function () {

        };

        GetAll();
        
        function GetAll() {
            receptionService.getAll().then(function (response) {
                $scope.receptions = response.data;
            }, function (response) {
                $scope.message = "la obtencion de las recepciones fallo";
            });
        }
    });
})();