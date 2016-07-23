(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('humidityController', function (msgS, $state, $scope, humidityService, receptionService, clearService) {
        $scope.humiditiesInReceptionEntry = [];

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'humidityAddToReception') {
                clearService.clearReceptionService();
                onStateChange();
            }
        });

        var GetAllHumiditiesByReception = function () {
            humidityService.getByReceptionEntry(receptionService.receptionEntryId).then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humiditiesInReceptionEntry = response.data;
                } else {
                    msgS.toastMessage(msgS.infoMessages[9], 1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[11], 3);
            });
        };

        var GetAllHumidities = function () {
            humidityService.getAll().then(function (response) {
                if (response.data.length !== 0) {
                    $scope.humiditiesInReceptionEntry = response.data;
                } else {
                    msgS.toastMessage(msgS.infoMessages[6], 1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[7], 3);
            });
        };

        var GetAllReceptionEntries = function () {
            receptionService.getAllEntries().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 0);
                } else {
                    $scope.humiditiesInReceptionEntry = response.data;
                }
            }, function (response) {
                msgS.msg('err', 5);
            });
        }

        $scope.redirectToAddHumidity = function (receptionEntryId) {
            receptionService.receptionEntryId = receptionEntryId;
            $state.go('humidityAddToReception');
        };

        $scope.saveHumidity = function (humidity) {
            var Humidity = {
                HumidityPercent: humidity,
                ReceptionEntryId: receptionService.receptionEntryId
            };
            humidityService.save(Humidity).then(function (response) {
                GetAllHumiditiesByReception();
                msgS.toastMessage(msgS.successMessages[3], 2);
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3], 3);
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
            humidityService.delete(Id).then(function (response) {
                swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
                if ($state.current.name === 'humidityManage') {
                    $.each($scope.humiditiesInReceptionEntry, function (i) {
                        if ($scope.humiditiesInReceptionEntry[i].Id === Id) {
                            $scope.humiditiesInReceptionEntry.splice(i, 1);
                            return false;
                        }
                    });
                }
                if ($state.current.name === 'humidityAddToReception') {
                    $.each($scope.humiditiesInReceptionEntry.Humidities, function (i) {
                        if ($scope.humiditiesInReceptionEntry.Humidities[i].Id === Id) {
                            $scope.humiditiesInReceptionEntry.Humidities.splice(i, 1);
                            return false;
                        }
                    });
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4], 3);
            });
        };

        (function () {
            switch ($state.current.name) {
                case 'humidityAdd':
                    GetAllReceptionEntries();
                    break;
                case 'humidityManage':
                    GetAllHumidities();
                    break;
                case 'humidityAddToReception':
                    GetAllHumiditiesByReception();
                    break;
            }
        })();
    });
})();
