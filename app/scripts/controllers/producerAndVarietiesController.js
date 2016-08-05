(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('producerAndVarietiesController', function ($scope, producerService, varietyService, msgS) {
        $scope.producers = [];
        $scope.varieties = [];
        
        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[8],3);
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                $scope.varieties = response.data;
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[5],3);
            });
        };

        $scope.saveProducer = function (producerName) {
            var Producer = {
                ProducerName: producerName
            };
            producerService.save(Producer).then(function (response) {
                msgS.msg('succ',5);
                GetAllProducers();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3],3);
            });
        };

        $scope.saveVariety = function (variety) {
            var Variety = {
                VarietyName:variety.varietyName, 
                LargeEnd: variety.LargeEnd, 
                LargeStart: variety.LargeStart,
                MediumEnd: variety.MediumEnd, 
                MediumStart: variety.MediumStart, 
                Small: variety.Small    
            };
            varietyService.save(Variety).then(function (response) {
                msgS.toastMessage(msgS.successMessage[3],2);
                GetAllVarieties();
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[3],3);
            });
        };

        $scope.confirmationDelete = function (id) {
            swal({
                title: "¿Estas seguro que deseas eliminar este registro?",
                text: "El productor con el id: " + id + " sera eliminada de forma permanente.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: false
            },
                function () {
                    deleteProducer(id);
                });

        };

        $scope.confirmVarietyDel = function (id) {
            swal({
                title: "¿Estas seguro que deseas eliminar este registro?",
                text: "La Variedad con el id : " + id + " sera eliminada de forma permanente",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: false
            },
                function () {
                    deleteVariety(id);
                });

        };

        var deleteProducer = function (producerId) {
            producerService.delete(producerId).then(function (response) {
                $.each($scope.producers, function (i) {
                    if ($scope.producers[i].Id === producerId) {
                        $scope.producers.splice(i, 1);
                        return false;
                    }
                });
                swal("Eliminado!", "El registro fue eliminado de manera exitosa.", "success");
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4],3);
            });
        };

        var deleteVariety = function (id) {
            varietyService.delete(id).then(function (response) {
                $.each($scope.varieties, function (i) {
                    if ($scope.varieties[i].Id === id) {
                        $scope.varieties.splice(i, 1);
                        return false;
                    }
                });
                swal("Eliminado!", "El registro fue eliminado de manera exitosa.", "success");
            }, function (response) {
                msgS.toastMessage(msgS.errorMessages[4],3);
            });
        };
        
        (function(){
            GetAllProducers();
            GetAllVarieties();
        })();
    });
})();