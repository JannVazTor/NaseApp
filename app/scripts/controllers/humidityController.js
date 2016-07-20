(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('humidityController', function (messageService,$state, $scope, humidityService, receptionService) {
        $scope.receptionEntries = [];
        $scope.humidities = [];
        var GetAllHumidities = function () {
            humidityService.getAll().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humidities = response.data;
                } else {
                    messageService.toastMessage(messageService.infoMessages[9],1);
                }
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[11],3);
            });
        };
        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.receptionEntries = response.data;
                } else {
                    messageService.toastMessage(messageService.infoMessages[6],1);
                }
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[7],3);
            });
        };
        $scope.saveHumidity = function (humidityPercent, receptionEntryId) {
            var humidity = {};
            humidity.HumidityPercent = humidityPercent;
            humidity.ReceptionEntryId = receptionEntryId;
            humidityService.save(humidity).then(function (response) {
                messageService.toastMessage(messageService.successMessages[3],2);
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[3],3);
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
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                $.each($scope.receptions, function (i) {
                    if ($scope.receptions[i].Id === receptionId) {
                        $scope.receptions.splice(i, 1);
                        return false;
                    }
                });
            }, function (response) {
                messageService.toastMessage(messageService.errorMessages[4],3);
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
