(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('producerAndVarietiesController', function ($scope, producerService, varietyService, toastr) {
        $scope.producers = [];
        $scope.varieties = [];
        
        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                toastr.error('ocurrio un error y no se pudieron obtener los productores.');
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                $scope.varieties = response.data;
            }, function (response) {
                toastr.error('ocurrio un error y no se pudieron obtener las variedades.');
            });
        };

        $scope.saveProducer = function (producerName) {
            producerService.save(producerName).then(function (response) {
                toastr.success('El productor a sigo guardado de manera exitosa.');
                GetAllProducers();
            }, function (response) {
                toastr.error('ocurrio un error y el productor no pudo ser guardado.');
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
                toastr.success('la variedad a sigo guardada de manera exitosa.');
                GetAllVarieties();
            }, function (response) {
                toastr.error('ocurrio un error y la variedad no pudo ser guardado.');
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
                toastr.error('ocurrio un error y el productor no pudo ser eliminado.');
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
                toastr.error('ocurrio un error y la variedad no pudo ser eliminada.');
            });
        };
        
        (function(){
            GetAllProducers();
            GetAllVarieties();
        })();
    });
})();