(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('generatePdfService', function ($scope) {
         var _usersPdf = function() {
            var doc = new jsPDF('p', 'pt');
            var elem = document.getElementById('userTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.text(40, 50, 'Usuarios Registrados');
            doc.autoTable(res.columns, res.data, { startY: 60 });
            doc.save("UsuariosRegistrados.pdf");
        };
        return {
            usersPdf: _usersPdf
        };
    });
});