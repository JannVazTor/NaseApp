(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('producerAndVarietiesController', function ($scope, producerService, varietyService, msgS) {
        $scope.producers = [];
        $scope.varieties = [];

        var GetAllProducers = function () {
            producerService.getAll().then(function (response) {
                $scope.producers = response.data;
            }, function (response) {
                msgS.msg('err', 8);
            });
        };

        var GetAllVarieties = function () {
            varietyService.getAll().then(function (response) {
                $scope.varieties = response.data;
            }, function (response) {
                msgS.msg('err', 7);
            });
        };

        $scope.saveProducer = function (producerName) {
            var Producer = {
                ProducerName: producerName
            };
            producerService.save(Producer).then(function (response) {
                msgS.msg('succ', 5);
                $scope.producerName = '';
                ClearForm('', 'producerForm');
                GetAllProducers();
            }, function (response) {
                if (response.status === 409) {
                    msgS.msg('err', 42);
                } else {
                    msgS.msg('err', 75);
                }
            });
        };

        $scope.saveVariety = function (variety) {
            if (AlreadyExists(variety.varietyName, $scope.varieties, 'VarietyName')) {
                msgS.msg('err', 43);
            } else {
                if (!variety.MediumStart || !variety.MediumEnd || !variety.Small || !variety.LargeStart || !variety.LargeEnd) {
                    msgS.msg('err', 44);
                } else {
                    if (variety.MediumStart >= variety.Small || variety.MediumEnd >= variety.Small) {
                        msgS.msg('err', 34);
                    } else {
                        if ((variety.LargeStart >= variety.MediumStart || variety.LargeStart >= variety.MediumEnd) && (variety.LargeEnd >= variety.MediumStart || variety.LargeEnd >= variety.MediumEnd)) {
                            msgS.msg('err', 35);
                        } else {
                            if (variety.MediumStart === variety.MediumEnd || variety.MediumStart > variety.MediumEnd) {
                                msgS.msg('err', 36);
                            } else {
                                if (variety.LargeStart === variety.LargeEnd || variety.LargeStart < variety.LargeEnd) {
                                    msgS.msg('err', 37);
                                } else {
                                    var Variety = {
                                        VarietyName: variety.varietyName,
                                        LargeEnd: variety.LargeEnd,
                                        LargeStart: variety.LargeStart,
                                        MediumEnd: variety.MediumEnd,
                                        MediumStart: variety.MediumStart,
                                        Small: variety.Small
                                    };
                                    varietyService.save(Variety).then(function (response) {
                                        msgS.msg('succ', 10);
                                        ClearForm('variety', 'varietyForm');
                                        GetAllVarieties();
                                    }, function (response) {
                                        msgS.msg('err', 38);
                                    });
                                }
                            }
                        }
                    }
                }
            }
        };

        function ClearForm(obj, formName) {
            if (obj !== '') {
                $scope[obj] = {};
                $scope[formName].$setPristine();
                $scope[formName].$setUntouched();
            }
        };

        function AlreadyExists(name, array, prop) {
            var exists = false;
            $.each(array, function (i) {
                if (array[i][prop].toLowerCase() === name.toLowerCase()) {
                    exists = true;
                    return false;
                }
            });
            return exists;
        };

        $scope.confirmationDelete = function (id, producerName) {
            swal(msgS.swalConfig("¿Estas seguro que deseas eliminar al productor " + producerName + "?"),
                function () {
                    deleteProducer(id);
                });
        };

        $scope.confirmVarietyDel = function (id, varietyName) {
            swal(msgS.swalConfig("¿Estas seguro que deseas eliminar a la variedad " + varietyName + "?"),
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
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 76);
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
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 77);
            });
        };

        $scope.generateProducersPDF = function(){
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('producerTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Productores Registrados');
            doc.autoTable(res.columns, res.data, {startY: 60});
            doc.save("ProductoresRegistrados.pdf");
        };

        $scope.generateVarietiesPDF = function(){
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('varietyTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Variedades Registradas');
            doc.autoTable(res.columns, res.data, {startY: 60});
            doc.save("VariedadesRegistradas.pdf");
        };

        (function () {
            GetAllProducers();
            GetAllVarieties();
        })();
    });
})();