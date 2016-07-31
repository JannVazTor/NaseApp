(function () {
    'use strict'
    angular.module('naseNutAppApp').directive('confirmPassword', ConfirmPassword);
    function ConfirmPassword() {
        var linkFn = function (scope, element, attributes, ngModel) {
            ngModel.$validators.confirmPassword = function (modelValue) {
                return modelValue == scope.password;
            };
            scope.$watch("password", function () {
                ngModel.$validate();
            });
        };
        return {
            require: "ngModel",
            scope: {
                password: "=confirmPassword"
            },
            link: linkFn
        };
    };
})();