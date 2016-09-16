(function () {
    'use strict'
    angular.module('naseNutAppApp').controller('harvestSeasonController', function ($scope, $rootScope, $filter, $state, msgS, harvestSeasonService, authService, clearService) {
        $scope.harvestSeasons = [];
        $scope.harvestSeason = {
            name: "",
            description: ""
        };
        $scope.save = function (harvestSeason) {
            var HarvestSeason = {
                Name: harvestSeason.name,
                Description: harvestSeason.description,
                UserName: authService.authentication.userName,
                EntryDate: $('#EntryDate').val(),
                IssueDate: $('#IssueDate').val()
            };
            harvestSeasonService.save(HarvestSeason).then(function (response) {
                msgS.msg('succ', 28);
                GetAll();
            }, function (response) {
                msgS.msg('err', 98);
            });
        };

        $scope.redirectUpdate = function (harvestSeason) {
            harvestSeasonService.harvestSeason = {
                Id: harvestSeason.Id,
                Name: harvestSeason.Name,
                Description: harvestSeason.Description,
                EntryDate: harvestSeason.EntryDate,
                IssueDate: harvestSeason.IssueDate
            };
            $state.go('harvestSeasonUpdate');
        };

        var onStateChange = $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if ($state.current.name !== 'harvestSeasonUpdate') {
                clearService.clearHarvestSeason();
            }
            onStateChange();
        });

        $scope.update = function (harvestSeason) {
            var HarvestSeason = {
                Id: harvestSeasonService.harvestSeason.Id,
                Name: harvestSeason.name,
                Description: harvestSeason.description,
                UserName: authService.authentication.userName,
                EntryDate: $('#EntryDate').val(),
                IssueDate: $('#IssueDate').val()
            };
            harvestSeasonService.update(HarvestSeason).then(function (response) {
                msgS.msg('succ', 29);
                $state.go('harvestSeason');
            }, function (response) {
                msgS.msg('err', 101);
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

        $scope.return = function () {
            if ($rootScope.prevState.length !== 0) {
                $state.go($rootScope.prevState);
            } else {
                $state.go('home');
            }
        };

        function FillHarvestSeasonUpdateObject(harSeason) {
            $scope.harvestSeason.name = harSeason.Name;
            $scope.entrydate = harSeason.EntryDate;
            $scope.issuedate = harSeason.IssueDate;
            $scope.harvestSeason.description = harSeason.Description;
        };

        (function () {
            switch ($state.current.name) {
                case 'harvestSeason':
                    GetAll();
                    $scope.issuedate = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    $scope.entrydate = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
                    break;
                case 'harvestSeasonUpdate':
                    FillHarvestSeasonUpdateObject(harvestSeasonService.harvestSeason);
                    break;
                default:
                    break;
            }
        })();

    });
})();