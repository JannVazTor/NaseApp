(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('harvestSeasonController', function ($scope, $filter, msgS, harvestSeasonService, authService) {
        $scope.harvestSeasons = [];

        $scope.save = function (harvestSeason) {
            var HarvestSeason = {
                Name: harvestSeason.name,
                Description: harvestSeason.description,
                UserName: authService.authentication.userName,
                EntryDate: $('#EntryDate').val(),
                IssueDate: $('#EntryDate').val()
            };
            harvestSeasonService.save(HarvestSeason).then(function (response) {
                msgS.msg('succ', 28);
                GetAll();
            }, function (response) {
                msgS.msg('err', 98);
            });
        };

        var GetAll = function () {
            harvestSeasonService.getAll().then(function (response) {
                if (response.data.length === 0) {
                    msgS.msg('info', 21);
                } else {
                    $scope.harvestSeasons = response.data;
                }
            }, function (response) {
                msgS.msg('err', 99);
            });
        };

        $scope.changeState = function (harvestSeasonId, state) {
            if ($scope.harvestSeasons.length === 1) {
                $.each($scope.harvestSeasons, function (i) {
                    if ($scope.harvestSeasons[i].Id === harvestSeasonId) {
                        $scope.harvestSeasons[i].Active = true;
                        return false;
                    }
                });
                msgS.msg('info', 22);
            } else {
                harvestSeasonService.changeState(harvestSeasonId, state ? 1 : 0).then(function (response) {
                    msgS.msg('succ', 6);
                    GetAll();
                }, function (response) {
                    $.each($scope.harvestSeasons, function (i) {
                        if ($scope.harvestSeasons[i].Id === harvestSeasonId) {
                            $scope.harvestSeasons[i].Active = !state;
                            return false;
                        }
                    });
                    msgS.msg('err', 22);
                });
            }
        };
        $scope.confirmationDelete = function (harvestSeasonId, name) {
            swal(msgS.swalConfig("¿Estas seguro que deseas eliminar la temporada con el nombre: " + name + "?"),
                function () {
                    deleteHarvestSeason(harvestSeasonId);
                });
        };

        var deleteHarvestSeason = function (id) {
            harvestSeasonService.delete(id).then(function (response) {
                $.each($scope.harvestSeasons, function (i) {
                    if ($scope.harvestSeasons[i].Id === id) {
                        $scope.harvestSeasons.splice(i, 1);
                        return false;
                    }
                });
                msgS.swalSuccess();
            }, function (response) {
                msgS.msg('err', 100);
            });
        };

        GetAll();
        $scope.issuedate = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
        $scope.entrydate = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
    });
})();