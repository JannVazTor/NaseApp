(function(){
  'use strict'
  angular.module('naseNutAppApp').controller('humidityController', function($scope,toastr, $state, humidityService, cylinderService, receptionService){
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
        toastr.error('La obtención de registros de humedad fallo.');
      });
    };

    $scope.saveHumidity = function (cylinderName) {
        receptionService.CylinderName = cylinderName;
      humidityService.save($scope.humidity).then(function (response) {
          $scope.savedSuccesfully = true;
      }, function (response) {
          toastr.error('Ocurrio un error y el registro de humedad no pudo ser guardado.');
      });
  };

   var GetCylinderId = function(cylinderName){
      humidityService.getCylinderId(cylinderName).then(function(response){
          $scope.humidity.CylinderId = response.data;
      });
  };
  $scope.confirmationDelete = function (humidityId) {
        swal({
            title: "Estas seguro?",
            text: "Tú eliminaras la humedad: " + humidityId + "!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function () {
                $scope.deleteHumidity(humidityId);
            });

    };
  $scope.deleteHumidity = function (humidityId) {
      humidityService.delete(humidityId).then(function (response) {
          swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
          $.each($scope.humidities, function (i) {
              if ($scope.humidities[i].Id === humidityId) {
                  $scope.humidities.splice(i, 1);
                  return false;
              }
          });
      }, function (response) {
          toastr.error('Ocurrio un error y el registro de humedad no pudo ser eliminado.');
      });
  };
  
    GetTotalHumidities();
  });
})();
