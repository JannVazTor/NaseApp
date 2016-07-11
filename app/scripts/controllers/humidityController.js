<<<<<<< HEAD
(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('humidityController', function (toastr, $state, $scope, humidityService, receptionService) {
        $scope.receptionEntries = [];
        $scope.humidities = [];
        var GetAllHumidities = function () {
            humidityService.getAll().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humidities = response.data;
                } else {
                    toastr.info('No se encontraron tomas de humedad en la base de datos.');
                }
            }, function (response) {
                toastr.error('Ocurrio un error al intentar obtener las humedades.');
            });
        };
        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.receptionEntries = response.data;
                } else {
                    toastr.info('No se econtraron recepciones en la base de datos.');
                }
            }, function (response) {
                toastr.error('Ocurrio un error al intentar obtener las recepciones.');
            });
        };
        $scope.saveHumidity = function (humidityPercent, receptionEntryId) {
            var humidity = {};
            humidity.HumidityPercent = humidityPercent;
            humidity.ReceptionEntryId = receptionEntryId;
            humidityService.save(humidity).then(function (response) {
                toastr.success('El registro se guardo correctamente.');
            }, function (response) {
                toastr.error('Ocurrio un error y el registro no pudo ser guardado.');
            });
        };

        $scope.confirmationDelete = function (receptionId) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras la recepcion: " + receptionId + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteReception(receptionId);
                });

        };

        $scope.deleteReception = function (receptionId) {
            receptionService.delete(receptionId).then(function (response) {
                $scope.message = "El registro fue eliminado  de manera exitosa."
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                $scope.message = "Ocurrio un error al intentar eliminar el registro.";
            });
        };
        var chargeHumidityAddData = function(){
            if($state.current.name === 'humidityAdd'){
                GetAllReceptionEntries();
            }
        };
        var chargeHumidityManageData = function(){
            if($state.current.name === 'humidityManage'){
                GetAllHumidities();
            }
        };
        chargeHumidityAddData();
        chargeHumidityManageData();
    });
})();
=======
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
>>>>>>> origin/master
