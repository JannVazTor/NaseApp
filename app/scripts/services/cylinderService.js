(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('cylinderService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/cylinder');
        }

        var _getAllActive = function(){
            return $http.get(apiPath + 'api/cylinder/GetAllActive');
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/cylinder', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/cylinder/' + id);
        }

        var _changeState = function (id, state) {
            var state = state ? 1 : 0;
            return $http.put(apiPath + 'api/cylinder/changeState/' + id + '/' + state);
        }

        return {
            getAll: _getAll,
            getAllActive: _getAllActive,
            save: _save,
            delete: _delete,
            changeState: _changeState
        };
    });
})();