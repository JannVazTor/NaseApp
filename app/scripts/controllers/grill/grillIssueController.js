(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('grillIssueController', function (msgS, $filter, $scope, grillService) {
        $scope.grillIssue = {
            Remission: "",
            DateCapture: "",
            Truck: "",
            Driver: "",
            Box: "",
            GrillsIds: []
        };
        $scope.date = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');

        $scope.grills = [];
        $scope.issues = [];

        $scope.saveGrillIssue = function () {
            $scope.grillIssue.DateCapture = $('#EntryDate').val();
            $scope.grills.forEach(function (element) {
                if (element.Added) {
                    $scope.grillIssue.GrillsIds.push(element.Id);
                }
            }, this);
            if ($scope.grillIssue.GrillsIds.length === 0) {
                msgS.msg('err', 16);
            } else {
                grillService.saveIssue($scope.grillIssue).then(function (response) {
                    cleanObj();
                    $.each($scope.grills, function (i) {
                        if ($scope.grills[i].Added) {
                            $scope.grills.splice(i, 1);
                            return false;
                        }
                    });
                    GetAllIssues();
                    msgS.msg('succ', 3);
                }, function (response) {
                    cleanObj();
                    msgS.msg('err', 17);
                })
            };
        };

        var GetAllGrills = function () {
            grillService.getAllCurrentInv().then(function (response) {
                $scope.grills = response.data;
                if (response.data.length !== 0) {
                    response.data.forEach(function (element) {
                        element.Added = false;
                    }, this);
                } else {
                    msgS.toastMessage(msgS.infoMessages[12], 1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessage[15], 3);
            });
        };

        var GetAllIssues = function () {
            grillService.getAllIssues().then(function (response) {
                $scope.issues = response.data;
                if (response.data.length === 0) {
                    msgS.toastMessage(msgS.infoMessages[13], 1);
                }
            }, function (response) {
                msgS.toastMessage(msgS.errorMessage[16], 3);
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