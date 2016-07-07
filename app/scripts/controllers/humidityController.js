(function(){
  'use strict'
  angular.module('naseNutAppApp').controller('humidityController', function($scope, $state, humidityService, cylinderService, receptionService){
    $scope.receptions = [];
    $scope.humidities = [];
    $scope.savedSuccesfully = false;
    $scope.CylinderName = receptionService.CylinderName;
    $scope.humidity = {
        HumidityPercent: "",
        CylinderName: receptionService.CylinderName,
        CylinderId: "",
        ReceptionId: receptionService.ReceptionId
    };


    var GetTotalHumidities = function(){
      humidityService.getTotalHumidities().then(function(response){
        $scope.humidities = response.data;
      }, function(response){
        $scope.message = "la obtención de registros de humedad fallo.";
      });
    };

    $scope.saveHumidity = function (cylinderName) {
        receptionService.CylinderName = cylinderName;
      humidityService.save($scope.humidity).then(function (response) {
          $scope.savedSuccesfully = true;
      }, function (response) {
          $scope.message = "ocurrio un error y el registro de humedad no pudo ser guardado."
      });
  };

   var GetCylinderId = function(cylinderName){
      humidityService.getCylinderId(cylinderName).then(function(response){
          $scope.humidity.CylinderId = response.data;
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
  
    GetTotalHumidities();
  });
})();