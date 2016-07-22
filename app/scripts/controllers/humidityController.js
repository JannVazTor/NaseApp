(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('humidityController', function (msgS,$state, $scope, humidityService, receptionService) {
        $scope.humidity = {
            HumidityPercent: '',
            ReceptionEntryId: '',
            DateCapture: $('#EntryDate').val()
        }
        $scope.folios = '';
        $scope.humidities = [];
        
        var GetAllHumidities = function () {
            humidityService.getAll().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humidities = response.data;
                } else {
                    msgS.toastMessage(msgS.infoMessages[9],1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[11],3);
            });
        };
        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.receptionEntries = response.data;
                } else {
                    msgS.toastMessage(msgS.infoMessages[6],1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[7],3);
            });
        };
        $scope.redirectToAddHumidities = function(receptionEntryId, folios){
            $scope.humidity.ReceptionEntryId = receptionEntryId;
            $scope.folios = folios;
           
            humidityService.getAllbyId(receptionEntryId).then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humidities = response.data;
                } else {
                    msgS.toastMessage(msgS.infoMessages[9],1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[11],3);
            });
             $state.go('humidityAddToReception');
        }
        $scope.saveHumidity = function (humidity) {
            $scope.humidity.DateCapture = $('#EntryDate').val()
            humidityService.save(humidity).then(function (response) {
                $scope.humidities = response.data;
                msgS.toastMessage(msgS.successMessages[3],2);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3],3);
            });
        };

        $scope.confirmationDelete = function (Id) {
            swal({
                title: "Estas seguro?",
                text: "Tú eliminaras la humedad: " + Id + "!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminarlo!",
                closeOnConfirm: false
            },
                function () {
                    $scope.deleteHumidity(Id);
                });

        };

        $scope.deleteHumidity = function (Id) {
            receptionService.delete(Id).then(function (response) {
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.receptions, function (i) {
                    if ($scope.humidities[i].Id === Id) {
                        $scope.humidities.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4],3);
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
