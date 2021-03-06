(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('msgS', function (toastr, $http) {
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
            'Ocurrio un error al intentar cargar los campos.',//13
            'Ocurrio un error al intentar cargar los datos del reporte.',//14
            'Ocurrio un error al intentar cargar los datos para la grafica.',//15
            'Debe agregar al menos un registro de parrillas para poder guardar la salida.',//16
            'Ocurrio un error la intentar guardar la salida.',//17
            'No puede agregar usuarios si no hay roles asignados.',//18
            'Ocurrio un error al intenter cargar las parrillas.',//19
            'Ocurrio un error al intentar cargar las tomas de humedad.',//20
            'Ocurrio un error al intentar cambiar la contraseña, verifique su contraseña anterior.',//21
            'Ocurrio un error al intentar cambiar el estado.',//22
            'Ocurrio un error y los registros no pudieron se guardados.',//23
            'Ocurrio un error y la Huerta/Lote no pudo ser guardada.',//24
            'Ocurrio un error y el cuadro no pudo ser guardado.',//25
            'Ocurrio un error al intentar cargar los cuadros.',//26
            'Ocurrio un error al intentar cargar las huertas/lotes.',//27
            'El Campo es requerido.',//28
            'La Huerta/Lote es requerida.',//29
            'El Cuadro es requerido.',//30
            'El Productor es requerido.',//31
            'El Campo es requerido.',//32
            'La Variedad es requerida.',//33
            'El Rango de medianas no puede ser mayor o igual a las chicas.',//34
            'El Rango de grandes no puede ser mayor o gial al de medianas.',//35
            'El Rango de medianas debe contener valores distintos y el valor de inicio debe ser menor al valor de finalizacion.',//36
            'El Rango de grandes debe contener valores distintos y el valor de inicio debe ser menor al valor de finalizacion.',//37
            'Ocurrio un error y la variedad no pudo ser guardada.',//38
            'El Cilindro ya existe en la base de datos.',//39
            'Ocurrio un error y no se pudo obtener la remision.',//40
            'Ocurrio un error y la salida de parrillas no pudo ser eliminada.',//41
            'El Productor ya existe.',//42
            'La Variedad ya existe.',//43
            'La tabla de rangos es requerida.',//44
            'Ocurrio un error y la parrilla no pudo ser agregada al inventario.',//45
            'Ocurrio un error al intentar cargar las salidas de parrillas.',//46
            'El Folio de la remisión ya existe en la base de datos.',//47
            'Ocurrio un error y la remision no pudo ser agregada.',//48
            'Ocurrio un error y el cilindro no pudo ser agregado.',//49
            'El Campo ya existe en la base de datos.',//50
            'La Huerta/Lote ya existe en la base de datos.',//51
            'El Cuadro ya existe en la base de datos.',//52
            'Una de los Folios ya existe en la base de datos.',//53
            'Se debe agregar al menos un tipo de nuez, sacos y kilos.',//54
            'Ocurrio un error y el resultado de proceso no pudo ser guardado.',//55
            'Ocurrio un error y la grafica "Acumulado por Productor" no pudo ser cargada.',//56
            'Ocurrio un error y la grafica "Numero de Nueces promedio por variedad" no pudo ser cargada.',//57
            'Ocurrio un error y la grafica "Cilindros ocupados" no pudo ser cargada.',//58
            'Ocurrio un error y la grafica "Parrillas en Inventario" no pudo ser cargada.',//59
            'Ocurrio un error y la grafica "Produccion acumulada por variedad" no pudo ser cargada.',//60
            'Ocurrio un error y la grafica "Porcentaje de Primeras y Segundas (Variedades)" no pudo ser cargada.',//61
            'Ocurrio un error y la parrilla no pudo ser eliminada.',//62
            'Ocurrio un error y la parrilla no pudo ser removida.',//63
            'Ocurrio un error y la parrilla no pudo ser agregada.',//64
            'Ocurrio un error y no se pudo cambiar el estado de la parrilla.',//65
            'Ocurrio un error y la parrilla no pudo ser guardada.',//66
            'Ocurrio un error y la parrilla no pudo ser actualizada.',//67
            'Ocurrio un error al intentar eliminar el cilindro.',//68
            'Ocurrio un error y la humedad no pudo ser guardada.',//69
            'Ocurrio un error y la humedad no pudo ser eliminada.',//70
            'Ocurrio un error y las tomas de humedad no pudieron ser obtenidas.',//71
            'Ocurrio un error y el muestreo no pudo ser guardado.',//72
            'Ocurrio un error y el muestreo no pudo ser eliminado.',//73
            'Ocurrio un error al intentar cargar los muestreos de calidad.',//74
            'Ocurrio un error al intentar guardar el productor.',//75
            'Ocurrio un error y el productor no pudo ser eliminado.',//76
            'Ocurrio un error y la variedad no pudo ser eliminada.',//77
            'El Folio de la recepciones ya fue agregado y esta en estado pendiente.',//78
            'Debe agregar al menos una recepcion para poder guardar.',//79
            'Debe asignar el cilindro para poder guardar.',//80
            'Debe asignar una variedad para poder guardar.',//81
            'Debe asignar un productor para poder guardar.',//82
            'Ocurrio un error y la recepcion no pudo ser actualizada.',//83
            'Ocurrio un error y la recepcion no pudo ser asignada.',//84
            'Ocurrio un error y la recepcion no pudo ser removida.',//85
            'Ocurrio un error y la recepcion no pudo ser agregada.',//86
            'Ocurrio un error y la recepcion no pudo ser eliminada.',//87
            'Ocurrio un error y la remision no pudo ser actualizada.',//88
            'Ocurrio un error y la remision no pudo ser eliminada.',//89
            'Ocurrio un error y las remisiones no pudieron ser cargadas.',//90
            'Ocurrio un error y el muestreo de calidad no pudo ser actualizado.',//91
            'Ocurrio un error y los muestreos de calidad no pudieron ser cargados.',//92
            'El Numero de parrilla ya existe en la base de datos.',//93
            'La Suma de los porcentajes debe ser igual a 100',//94
            'Debe agregar al menos un variedad y porcentaje para poder guardar la huerta.',//95
            'Corrija los errores en los porcentajes de variedad antes de continuar.',//96
            'La Huerta ya existe en el campo.',//97
            'Ocurrio un error y la temporada no pudo ser agregada.',//98
            'Ocurrio un error y las temporadas no pudieron ser cargadas.',//99
            'Ocurrio un error y la temporada no pudo ser eliminada.',//100
            'Ocurrio un error y la temporada no pudo ser actualizada.',//101
            'Los tamaños y los sacos de primera no coinciden.'];

        var success = ['El Usuario fue eliminado de manera exitosa.',//0
            'El Usuario fue agregado de manera exitosa.',//1
            'El Campo fue agregado de manera exitosa.',//2
            'La Salida fue agregada de manera exitosa.',//3
            'La Contraseña fue cambiada correctamente.',//4
            'El Productor fue agregado de manera exitosa.',//5
            'El Estado fue cambiado correctamente.',//6
            'Los Registros fueron agregados correctamente.',//7
            'La Huerta/Lote fue agregada correctamente.',//8
            'El Cuadro se agrego correctamente.',//9
            'La Variedad se agrego correctamente.',//10
            'El Muestreo fue agregado de manera exitosa.',//11
            'La Salida se elimino correctamente, las parrillas estan ahora en inventario.',//12
            'La Parrilla fue agregada al inventario correctamente.',//13
            'La Remision se agrego correctamente.',//14
            'El Cilindro fue agregado correctamente.',//15
            'El Resultado de proceso fue agregado correctamente.',//16
            'El Muestreo fue agregado correctamente.',//17
            'La Parrilla fue agregada de manera exitosa.',//18
            'La Parrilla fue actualizada correctamente.',//19
            'El Estado fue cambiado exitosamente.',//20
            'La Humedad fue agregada de manera exitosa.',//21
            'La Recepcion fue actualizada correctamente.',//22
            'La Recepcion fue asignada correctamente.',//23
            'La Recepcion fue removida exitosamente.',//24
            'La Recepcion se agrego correctamente.',//25
            'La Remision fue actualizada correctamente.',//26
            'El Muestreo fue actualizado correctamente.',//27
            'La Temporada fue agregada exitosamente.',//28
            'La Temporada fue actualizada correctamente.'];

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
            'No se encontraron huertas/lotes en la base de datos.',//10
            'No se encontraron salidas de parrillas en la base de datos.',//11
            'No se encontraron datos para la grafica "Acumulado por Productor"',//12
            'No se encontraron datos para la grafica "Numero de Nueces promedio por variedad"',//13
            'No se encontraron datos para la grafica "Cilindros ocupados"',//14
            'No se encontraron datos para la grafica "Parrillas en Inventario"',//15
            'No se encontraron datos para la grafica "Produccion acumulada por variedad"',//16
            'No se encontraron datos para la grafica "Porcentaje de Primeras y Segundas (Variedades)"',//17
            'No se encontraron muestras de humedad en la base de datos.',//18
            'No se encontraron muestreos de calidad en la base de datos.',//19
            'No se encontraron recepciones en la base de datos.',//20
            'No se encontraron temporadas en la base de datos.',//21
            'La Temporada no puede ser desactivada debido a que no hay otra temporada para asignar.'];

        var _swalConfig = function (title) {
            return {
                title: title,
                text: "El Registro sera eliminado de forma permanente.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: false
            };
        }
        var _swalSuccess = function () {
            swal("Eliminado!", "El registro fue eliminado  de manera exitosa.", "success");
        }
        
        return {
            msg: _msg,
            swalSuccess: _swalSuccess,
            swalConfig: _swalConfig,
        };
    });
})();
