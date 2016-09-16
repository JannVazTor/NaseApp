(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('harvestSeasonService', function (apiPath, $http) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/harvestSeason');
        }
        var _save = function (data) {
            return $http.post(apiPath + 'api/harvestSeason', data);
        }
        var _delete = function (id) {
            return $http.delete(apiPath + 'api/harvestSeason/' + id);
        }
        var _changeState = function (id, state) {
            return $http.put(apiPath + 'api/harvestSeason/changeState/' + id + '/' + state);
        }
        var _update = function(data){
            return $http.put(apiPath + 'api/harvestSeason', data);
        }
        var _harvestSeason = {
            Id: "",
            Name: "",
            Description: "",
            EntryDate: "",
            IssueDate: ""
        }
        return {
            getAll: _getAll,
            save: _save,
            delete: _delete,
            changeState: _changeState,
            harvestSeason: _harvestSeason,
            update: _update
        };
    });
})();