(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('fieldController', function (msgS, $scope, fieldService) {

        $scope.saveField = function (field) {
            var Field = {
                FieldName: field.FieldName,
                Hectares: field.Hectares,
                Batch: field.Batch,
                Box: field.Box
            };
            fieldService.save(Field).then(function (response) {
                msgS.msg('succ',2);
                GetAllFields();
            }, function (response) {
                msgS.msg('err',10);
            });
        };

        var GetAllFields = function () {
            fieldService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info',4);
                } else {
                    $scope.fields = response.data;
                }
            }, function (response) {
                msgS.msg('err',11);
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
                msgS.msg('err',12);
            });
        };
        GetAllFields();
    });
})();