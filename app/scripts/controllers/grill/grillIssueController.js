(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillIssueController', function (msgS, $scope, grillService) {
        $scope.grillIssue = {
            Remission: "",
            DateCapture: "",
            Truck: "",
            Driver: "",
            Box: "",
            GrillIds: []
        };

        $scope.grills = [];
        $scope.issues = [];

        $scope.saveGrillIssue = function () {
            $scope.grillIssue.DateCapture = $('#grillIssueDate').val();
            $scope.grills.forEach(function (element) {
                if (element.Added) {
                    $scope.grillIssue.GrillIds.push(element.Id);
                }
            }, this);
            grillService.saveIssue($scope.grillIssue).then(function (response) {
                cleanObj();
                $.each($scope.grills, function (i) {
                    if ($scope.grills[i].Added) {
                        $scope.grills.splice(i, 1);
                        return false;
                    }
                });
                msgS.toastMessage(msgS.successMessages[3],2);
            }, function (response) {
                cleanObj();
                msgS.toastMessage(msgS.errorMessage[3],3);
            });
        };

        var GetAllGrills = function () {
            grillService.getAllCurrentInv().then(function (response) {
                $scope.grills = response.data;
                if (response.data.length !== 0) {
                    response.data.forEach(function (element) {
                        element.Added = false;
                    }, this);
                } else {
                    msgS.toastMessage(msgS.infoMessages[12],1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessage[15],3);
            });
        };

        var GetAllIssues = function () {
            grillService.getAllIssues().then(function (response) {
                $scope.issues = response.data;
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[13],1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessage[16],3);
            });
        };

        var cleanObj = function () {
            $scope.grillIssue = {
                Remission: "",
                DateCapture: "",
                Truck: "",
                Driver: "",
                Box: "",
                GrillsIds: []
            };
        };

        GetAllGrills();
        GetAllIssues();
    });
})();