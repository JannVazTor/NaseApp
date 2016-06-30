(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('receptionService', function ($http, apiPath) {
<<<<<<< HEAD
        var _ReceptionId = "";
        var _CylinderId = "";

=======
        var _ProducerId = "";
        var _Folio = "";
        var _reception = {
            Id : "",
            Variety: "",
            EntryDate: "",
            ReceivedFromField: "",
            CylinderId: "",
            FieldName: "",
            CarRegistration: "",
            HeatHoursDrying: "",
            HumidityPercent: "",
            Observations: "",
            ProducerId: "",
            Folio: ""
        };
   
>>>>>>> origin/master
        var _getAll = function () {
            return $http.get(apiPath + 'api/reception/getAll').success(function(data){
                data.forEach(function(element) {
                    element.IsAlreadyAssigned = false;
                });
            });
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/reception', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/reception/' + id);
        }
<<<<<<< HEAD

        return {
            ReceptionId: _ReceptionId,
            CylinderId: _CylinderId,
=======
        var _update = function (id, data) {
            return $http.put(apiPath + 'api/reception/'+id, data);
        }
        
        return {
            ProducerId: _ProducerId,
            folio: _Folio,
            reception: _reception,
>>>>>>> origin/master
            getAll: _getAll,
            save: _save,
            delete: _delete,
            update: _update
        };
    });
})();
