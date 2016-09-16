(function () {
    'use strict'
    angular.module('naseNutAppApp').factory('clearService', function (receptionAndGrillService, harvestSeasonService, samplingService, remissionService, receptionService, grillService) {

        var _clearReceptionAndGrillService = function () {
            receptionAndGrillService.IsGrillToReception = false;
            receptionAndGrillService.grillId = "";
        }
        var _clearReceptionService = function () {
            receptionService.receptionEntryId = "";
            receptionService.ReceptionId = "";
            receptionService.Folio = "";
            receptionService.reception = {
                ReceivedFromField: "",
                FieldId: "",
                CarRegistration: "",
                HeatHoursDrying: "",
                HumidityPercent: "",
                Observations: ""
            };
        }
        var _clearGrillService = function () {
            grillService.grill = {
                DateCapture: "",
                Size: "",
                FieldId: "",
                Kilos: "",
                Sacks: "",
                Quality: "",
                VarietyId: "",
                ProducerId: ""
            };
            grillService.grillId = "";
        }
        var _clearSamplingService = function () {
            samplingService.sampling = {
                Id: grillService.id,
                DateCapture: "",
                SampleWeight: "",
                HumidityPercent: "",
                WalnutNumber: "",
                Performance: "",
                TotalWeightOfEdibleNuts: ""
            };
        }

        var _clearRemissionService = function () {
            remissionService.remission = {
                Id: "",
                Quantity: "",
                Butler: "",
                TransportNumber: "",
                Driver: "",
                Elaborate: ""
            };
        }

        var _clearHarvestSeason = function () {
            harvestSeasonService.harvestSeason = {
                Id: "",
                Name: "",
                Description: "",
                EntryDate: "",
                IssueDate: ""
            }
        }
        return {
            clearReceptionAndGrillService: _clearReceptionAndGrillService,
            clearReceptionService: _clearReceptionService,
            clearGrillService: _clearGrillService,
            clearSamplingService: _clearSamplingService,
            clearRemissionService: _clearRemissionService,
            clearHarvestSeason: _clearHarvestSeason
        }
    });
})();