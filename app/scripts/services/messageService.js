(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('msgS', function (toastr, $http) {
        var _arrayInfoMessage = ['Debe agregar al menos una recepcion.',
            'La recepcion ya se encuentra agregada y en estado pendiente.',
            'No puede agregar si no hay cilindros disponibles.',
            'No puede agregar si no hay variedades disponibles.',
            'No puede agregar si no hay productores disponibles.',
            'No se econtraron productores en la base de datos.',
            'No se econtraron recepciones en la base de datos.',
            'No se encontraron variedades en la base de datos.',
            'No se encontraron cilindros en la base de datos.',
            'No se encontraron tomas de Humedad en la base de datos.',
            'No se encontraron datos para el reporte.',
            'No se encontraron muestreos en la base de datos.',
            'No se encontraron parrillas en la base de datos.',
            'No se encontraron salidas en al base de datos'];
        var _arraySuccessMessage = ['Los registros se agrego correctamente.',
            'El registro se actualizo correctamente.',
            'El registro se removio correctamente.',
            'El registro se guardo correctamente',
            'El estado se cambio correctamente'];
        var _arrayErrorMessage = ['Ocurrio un error y los registros no pudieron ser guardados.',
            'Ocurrio un error, por favor intentelo de nuevo.',
            'Ocurrio un error y el registro no pudo ser asignado.',
            'Ocurrio un error y el registro no pudo ser guardado.',
            'Ocurrio un error y el registro no pudo ser removido.',
            'Ocurrio un error al intentar cargar las variedades.',
            'Ocurrio un error al intentar cargar los cilindros.',
            'Ocurrio un error al intentar cargar las recepciones.',
            'Ocurrio un error al intentar cargar los productores',
            'Ocurrio un error y el registro no pudo ser actualizado.',
            'Ocurrio un error al intentar obtener los registros',
            'Ocurrio un error al intentar obtener las humedades.',
            'Ocurrio un error en el servidor y no se pudo obtener la informacion.',
            'Ocurrio un error al intentar obtener los muestreos.',
            'Se debe agregar al menos un tipo de nuez, sacos y kilos.',
            'Ocurrio un error al intentar obtener las parrillas.',
            'Ocurrio un error al intentar obtener las salidas.',
            'Ocurrio un error y el estado no pudo ser cambiado.',
            'Ocurrio un error y el registro no pudo ser asignado.'];



        var _toastMessage = function (message, type) {
            switch (type) {
                case 1:
                    toastr.info(message);
                    break;
                case 2:
                    toastr.success(message);
                    break;
                case 3:
                    toastr.error(message);
                    break;
            }
        }
        var _msg = function (type, index) {
            switch (type) {
                case 'info':

                    break;
                case 'succ':
                    toastr.success(success[index]);
                    break;
                case 'err':
                    toastr.error(errors[index]);
                    break;
                default:
                    break;
            }
        }
        var errors = ['Ocurrio un error al intentar cargar los roles.',
            'Ocurrio un error y el usuario no pudo ser registrado.',
            'Ocurrio un error y el usuario no pudo ser eliminado.',
            'Ocurrio un error al intentar cargar a los usuarios.',
            'Ocurrio un error y el usuario no pudo ser loggeado.'];

        var success = ['El Usuario fue eliminado de manera exitosa.',
        'El Usuario fue agregado de manera exitosa.'];

        return {
            infoMessages: _arrayInfoMessage,
            errorMessages: _arrayErrorMessage,
            successMessages: _arraySuccessMessage,
            toastMessage: _toastMessage,
            msg: _msg
        };
    });
})();
