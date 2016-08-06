(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('fieldService', function ($http, apiPath) {
        var _getAll = function () {
            return $http.get(apiPath + 'api/field/getAll');
        }

        var _getFields = function () {
            return $http.get(apiPath + 'api/field/fields');
        }

        var _getBatches = function () {
            return $http.get(apiPath + 'api/field/batches');
        }

        var _getBoxes = function () {
            return $http.get(apiPath + 'api/field/boxes');
        }

        var _getBatchesInField = function (fieldId) {
            return $http.get(apiPath + 'api/field/batchesInField/' + fieldId);
        }

        var _getBoxesInBatch = function (batchId) {
            return $http.get(apiPath + 'api/field/boxesInBatch/' + batchId);
        }

        var _saveField = function (data) {
            return $http.post(apiPath + 'api/field', data);
        }

        var _saveBatch = function (data) {
            return $http.post(apiPath + 'api/field/batch', data);
        }

        var _saveBox = function (data) {
            return $http.post(apiPath + 'api/field/box', data);
        }

        var _delete = function (id) {
            return $http.delete(apiPath + 'api/field/' + id);
        }

        return {
            saveField: _saveField,
            saveBatch: _saveBatch,
            saveBox: _saveBox,
            getBoxes: _getBoxes,
            getBatches: _getBatches,
            getFields: _getFields,
            getBatchesInField: _getBatchesInField,
            getBoxesInBatch: _getBoxesInBatch,
            getAll: _getAll,
            delete: _delete
        };
    });
})();