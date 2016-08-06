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
                    toastr.info(info[index]);
                    break;
                case 'succ':
                    toastr.success(success[index]);
                    break;
                case 'err':
                    toastr.error(errors[index]);
                    break;
                default:
                    toastr.error('Ocurrio un error.');
                    break;
            }
        }
        var errors = ['Ocurrio un error al intentar cargar los roles.',//0
            'Ocurrio un error y el usuario no pudo ser registrado.',//1
            'Ocurrio un error y el usuario no pudo ser eliminado.',//2
            'Ocurrio un error al intentar cargar a los usuarios.',//3
            'Ocurrio un error y el usuario no pudo ser loggeado.',//4
            'Ocurrio un error al intentar cargar las recepciones.',//5
            'Ocurrio un error al intentar cargar los cilindros.',//6
            'Ocurrio un error al intentar cargar las variedades.',//7
            'Ocurrio un error al intentar cargar a los productores.',//8
            'La Sesion a expirado.',//9
            'Ocurrio un error y el campo no pudo ser guardado.',//10
            'Ocurrio un error al intentar cargar los campos.',//11
            'Ocurrio un error al intentar eliminar el campo.',//12
            'Ocurrio dun error al intentar cargar los campos.',//13
            'Ocurrio un error al intentar cargar los datos del reporte.',//14
            'Ocurrio un error al intentar cargar los datos para la grafica.',//15
            'Debe agregar al menos un registro de parrillas para poder guardar la salida.',//16
            'Ocurrio un error la intentar guardar la salida.',//17
            'No puede agregar usuarios si no hay roles asignados.',//18
            'Ocurrio un error al intenter cargar las parrillas.',//19
            'Ocurrio un error al intentar cargar las tomas de humedad.',//20
            'Ocurrio un error al intentar cambiar la contraseña, verifique su contraseña anterior.',//21
            'Ocurrio un error al intentar cambiar el estado.',//22
            'Ocucrrio un error y los registros no pudieron se guardados.',//23
            'Ocurrio un error y la Huerta/Lote no pudo ser guardada.',//24
            'Ocurrio un error y el cuadro no pudo ser guardado.',//25
            'Ocurrio un error al intentar cargar los cuadros.',//26
            'Ocurrio un error al intentar cargar las huertas/lotes.',//27
            'El Campo es requerido.',//28
            'La Huerta/Lote es requerida.',//29
            'El Cuadro es requerido.'];

        var success = ['El Usuario fue eliminado de manera exitosa.',//0
            'El Usuario fue agregado de manera exitosa.',//1
            'El Campo fue agregado de manera exitosa.',//2
            'La Salida fue agregada de manera exitosa.',//3
            'La Contraseña fue cambiada correctamente.',//4
            'El Productor fue agregado de manera exitosa.',//5
            'El Estado fue cambiado correctamente.',//6
            'Los Registros fueron agregados correctamente.',//7
            'La Huerta/Lote fue agregada correctamente.',//8
            'El Cuadro se agrego correctamente.'];

        var info = ['No se encontraron recepciones en la base de datos.',//0
            'No se encontraron cilindros en la base de datos.',//1
            'No se encontraron variedades en la base de datos.',//2
            'No se encontraron productores en la base de datos.',//3
            'No se encontraron campos en la base de datos.',//4
            'No se encontraron datos en la base de datos.',//5
            'No se encontraron datos para la grafica de Produccion Acumuladad por Variedades.',//6
            'No se encontraron parrillas en la base de datos.',//7
            'No se encontraron tomas de humedad en la base de datos.',//8
            'No se encontraron cuadros en la base de datos.',//9
            'No se encontraron huertas/lotes en la base de datos.'];

        return {
            infoMessages: _arrayInfoMessage,
            errorMessages: _arrayErrorMessage,
            successMessages: _arraySuccessMessage,
            toastMessage: _toastMessage,
            msg: _msg
        };
    });
})();
