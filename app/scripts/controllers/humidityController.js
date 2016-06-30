(function(){
  'use strict'
  angular.module('naseNutAppApp').controller('humidityController', function($scope, $state, humidityService, cylinderService, receptionService){
    $scope.receptions = [];
    $scope.humidities = [];
    $scope.savedSuccesfully = false;
    $scope.humidity = {
        HumidityPercent: "",
        CylinderId: "",
        ReceptionId: humidityService.ReceptionId
    };


    var GetTotalHumidities = function(){
      humidityService.getTotalHumidities().then(function(response){
        $scope.humidities = response.data;
      }, function(response){
        $scope.message = "la obtención de registros de humedad fallo.";
      });
    };
    $scope.getReceptions = function (CylinderId) {
        humidityService.getReceptionsByCylinder(CylinderId).then(function (response) {
        $scope.receptions = response.data;

    })
  };

    $scope.saveHumidity = function () {
      humidityService.save($scope.humidity).then(function (response) {
          $scope.savedSuccesfully = true;
      }, function (response) {
          $scope.message = "ocurrio un error y el registro de humedad no pudo ser guardado."
      });
  };

  $scope.deleteHumidity = function (humidityId) {
      humidityService.delete(humidityId).then(function (response) {
          $scope.message = "El registro se elimino de manera exitosa.";
          $.each($scope.humidities, function (i) {
              if ($scope.humidities[i].Id === humidityId) {
                  $scope.humidities.splice(i, 1);
                  return false;
              }
          });
      }, function (response) {
          $scope.message = "Ocurrio un error y el registro no pudo ser eliminado.";
      });
  };


    var GetAllCylinders = function () {
        cylinderService.getAll().then(function (response) {
            $scope.cylinders = response.data;
        }, function (response) {
            $scope.message = "la obtencion de cilindros fallo.";
        });
    };

    GetAllCylinders();
    GetTotalHumidities();
  });
})();
