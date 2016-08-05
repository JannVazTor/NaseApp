(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('fieldController', function (msgS, $scope, fieldService) {
        $scope.batch = {
            Field: {}
        };
        $scope.box = {
            Batch: {}
        };

        $scope.saveField = function (field) {
            var Field = {
                FieldName: field
            };
            fieldService.saveField(Field).then(function (response) {
                msgS.msg('succ', 2);
                GetFields();
            }, function (response) {
                msgS.msg('err', 10);
            });
        };

        $scope.saveBatch = function (batch) {
            var Batch = {
                Batch: batch.Batch,
                Hectares: batch.Hectares,
                FieldId: batch.Field.Id
            };
            fieldService.saveBatch(Batch).then(function (response) {
                msgS.msg('succ', 8);
                GetAll();
                GetBatches();
                GetAllFields();
            }, function (response) {
                msgS.msg('err', 24);
            });
        }

        $scope.saveBox = function (box) {
            var Box = {
                Box: box.Box,
                BatchId: box.Batch.Id
            };
            fieldService.saveBox(Box).then(function (response) {
                GetAll();
                msgS.msg('succ', 9);
            }, function (response) {
                msgS.msg('err', 25);
            });
        };

        var GetAll = function () {
            fieldService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 4);
                } else {
                    $scope.fieldsAndBatches = response.data;
                }
            }, function (response) {
                msgS.msg('err', 11);
            });
        };

        var GetFields = function () {
            fieldService.getFields().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 4);
                } else {
                    $scope.fields = response.data;
                    $scope.batch.Field = $scope.fields[$scope.fields.length-1];
                }
            }, function (response) {
                msgS.msg('err', 11);
            });
        };

        var GetBoxes = function () {
            fieldService.getBoxes().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 9);
                } else {
                    $scope.boxes = response.data;
                }
            }, function (response) {
                msgS.msg('err', 26);
            });
        };

        var GetBatches = function () {
            fieldService.getBatches().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 10);
                } else {
                    $scope.batches = response.data;
                    $scope.box.Batch = $scope.batches[$scope.batches.length-1];
                }
            }, function (response) {
                msgS.msg('err', 27);
            });
        };

        $scope.confirmFieldDel = function (id) {
            swal({
                title: "¿Estas seguro que deseas eliminar este registro?",
                text: "El Campo con el id : " + id + " sera eliminada de forma permanente",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: false
            },
                function () {
                    deleteField(id);
                });

        };
        var deleteField = function (id) {
            fieldService.delete(id).then(function (response) {
                $.each($scope.fields, function (i) {
                    if ($scope.fields[i].Id === id) {
                        $scope.fields.splice(i, 1);
                        return false;
                    }
                });
                swal("Eliminado!", "El registro fue eliminado de manera exitosa.", "success");
            }, function (response) {
                msgS.msg('err', 12);
            });
        };
        GetAll();
        GetFields();
        GetBoxes();
        GetBatches();
    });
})();