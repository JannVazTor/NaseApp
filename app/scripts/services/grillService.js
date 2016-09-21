(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('grillService', function ($http, apiPath) {
        var _grillId = "";
        var _grill = {
            DateCapture: "",
            Size: "",
            Kilos: "",
            Sacks: "",
            Quality: "",
            VarietyId: "",
            ProducerId: ""
        };

        var _getAll = function () {
            return $http.get(apiPath + 'api/grill');
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/grill', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/grill/' + id);
        }

        var _deleteGrillIssue = function(id){
            return $http.delete(apiPath + 'api/grill/grillIssue/' + id);
        }

        var _removeGrillFromGrillIssue = function(id){
            return $http.put(apiPath + 'api/grill/removeGrillFromGrillIssue/' + id);
        }

        var _update = function (id, data) {
            return $http.put(apiPath + 'api/grill/' + id, data);
        }

        var _changeStatus = function (id, status) {
            return $http.put(apiPath + 'api/grill/changeStatus/' + id + '/' + status);
        }

        var _getAllCurrentInv = function () {
            return $http.get(apiPath + 'api/grill/getAllCurrentInv');
        }

        var _saveIssue = function (data) {
            return $http.post(apiPath + 'api/grill/Issue', data);
        }

        var _getAllIssues = function () {
            return $http.get(apiPath + 'api/grill/getAllissues');
        }
        return {
            grill: _grill,
            getAll: _getAll,
            save: _save,
            changeStatus: _changeStatus,
            getAllCurrentInv: _getAllCurrentInv,
            delete: _delete,
            update: _update,
            saveIssue: _saveIssue,
            getAllIssues: _getAllIssues,
            grillId: _grillId,
            deleteGrillIssue: _deleteGrillIssue,
            removeGrillFromGrillIssue: _removeGrillFromGrillIssue
        };
    });
})();