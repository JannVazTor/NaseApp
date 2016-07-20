(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('messageService', function (toastr, $http) {
       var _arrayInfoMessage = ['Debe agregar al menos una recepcion.',
                            'La recepcion ya se encuentra agregada y en estado pendiente.',
                            'No puede agregar si no hay cilindros disponibles.',
                            'No puede agregar si no hay variedades disponibles.',
                            'No puede agregar si no hay productores disponibles.',
                            'No se econtraron productores en la base de datos.',
                            'No se econtraron recepciones en la base de datos.',
                            'No se encontraron variedades en la base de datos.',
                            'No se encontraron cilindros en la base de datos.'];
      var _arraySuccessMessage = ['Los registros se agrego correctamente.',
                                'El registro se actualizo correctamente.',
                                'El registro se removio satisfactoriamente.',
                                ];
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
                                'Ocurrio un error al intentar obtener los registros'];

       

      var _toastMessage = function(message, type){
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
        return {
            infoMessages: _arrayInfoMessage,
            errorMessages: _arrayErrorMessage,
            successMessages: _arraySuccessMessage,
            toastMessage: _toastMessage
        };
    });
})();
