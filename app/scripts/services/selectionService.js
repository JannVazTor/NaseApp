(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('selectionService', function ($http, apiPath) {
        var _getSelections = function(){
          return $http.get(apiPath + 'api/selection/getAll')
        }

        var _save = function (data) {
            return $http.post(apiPath + 'api/selection/saveSelection', data);
        }
 

        var _delete = function(id){
            return $http.delete(apiPath + 'api/selection/' + id);
        }

        return {
            getAll: _getSelections,
            save: _save,
            delete: _delete
        };
    });
})();