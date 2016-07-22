(function () {
    angular.module('naseNutAppApp').controller('listenerController', function ($scope, AUTH_EVENTS, $state) {
        $scope.$on(AUTH_EVENTS.notAuthorized, function () {
            $state.go('accessDenied');
        });
    });
})();