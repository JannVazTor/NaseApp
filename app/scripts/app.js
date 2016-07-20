(function () {
  'use strict';
  var app = angular
    .module('naseNutAppApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'LocalStorageModule',
      'ui.router',
      'ui.bootstrap.datetimepicker',
      'datatables',
      'datatables.buttons',
      'toastr',
      'datatables.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'loginController'
        })
        .state('accessDenied', {
          url: '/accesoDenegado',
          templateUrl: 'views/accessDenied.html'
        })
        .state('users', {
          url: '/usuarios',
          templateUrl: 'views/users.html',
          controller: 'userController'
        })
        .state('producersAndVarieties', {
          url: '/productoresYvariedades',
          templateUrl: 'views/producersAndVarieties.html',
          controller: 'producerAndVarietiesController',
          data: {
            roles: ['admin']
          }
        })
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('cylinder', {
          url: '/cilindros',
          templateUrl: 'views/cylinder.html',
          controller: 'cylinderController'
        })
        /*Receptions*/
        .state('receptionAdd', {
          url: '/recepcionAlta',
          templateUrl: 'views/reception/receptionAdd.html',
          controller: 'receptionController'
        })
        .state('receptionManage', {
          url: '/recepcionGestion',
          templateUrl: 'views/reception/receptionManage.html',
          controller: 'receptionController'
        })
        .state('receptionUpdate', {
          url: '/receptionModificar',
          templateUrl: 'views/reception/receptionUpdate.html',
          controller: 'receptionController'
        })
        /*Remissions*/
        .state('remissionManage', {
          url: '/remisionGestion',
          templateUrl: 'views/remission/remissionManage.html',
          controller: 'remissionController'
        })
        .state('remissionAdd', {
          url: '/remisionAlta',
          templateUrl: 'views/remission/remissionAdd.html',
          controller: 'remissionController'
        })
        .state('remissionUpdate', {
          url: '/remisionModificar',
          templateUrl: 'views/remission/remissionUpdate.html',
          controller: 'remissionController'
        })
        /*Grills*/
        .state('grillAdd', {
          url: '/parrillasAlta',
          templateUrl: 'views/grill/grillAdd.html',
          controller: 'grillController'
        })
        .state('grillManage', {
          url: '/parrillasGestion',
          templateUrl: 'views/grill/grillManage.html',
          controller: 'grillController'
        })
        .state('grillIssue', {
          url: '/inventarioSalidas',
          templateUrl: 'views/grill/grillIssue.html',
          controller: 'grillIssueController'
        })
        .state('grillCurrentInv', {
          url: '/parrillasInventarioActual',
          templateUrl: 'views/grill/grillCurrentInv.html',
          controller: 'grillCurrentInvController'
        })
        .state('grillUpdate', {
          url: '/grillU',
          templateUrl: 'views/grill/grillUpdate.html',
          controller: 'grillController'
        })
        /*Humidity*/
        .state('humidity', {
          url: '/humidity',
          templateUrl: 'views/humidity.html',
          controller: 'humidityController'
        })
        .state('humidityAdd', {
          url: '/humedad',
          templateUrl: 'views/humidity/humidityAdd.html',
          controller: 'humidityController'
        })
        .state('humidityManage', {
          url: '/humedadM',
          templateUrl: 'views/humidity/humidityManage.html',
          controller: 'humidityController'
        })
        /*Sampling*/
        .state('samplingGrillManage', {
          url: '/muestreoParrillas',
          templateUrl: 'views/sampling/samplingGrillManage.html',
          controller: 'samplingController'
        })
        .state('samplingAdd', {
          url: '/agregarMuestreo',
          templateUrl: 'views/sampling/samplingAdd.html',
          controller: 'samplingController'
        })
        .state('samplingUpdate', {
          url: '/modificarMuestreo',
          templateUrl: 'views/sampling/samplingUpdate.html',
          controller: 'samplingController'
        })
        .state('samplingReceptionAdd', {
          url: '/agregarMuestreoRecepcion',
          templateUrl: 'views/sampling/samplingReceptionAdd.html',
          controller: 'samplingController'
        })
        .state('samplingReceptionEntryAdd', {
          url: '/agregarMuestreoRecepcion',
          templateUrl: 'views/sampling/samplingAdd.html',
          controller: 'samplingController'
        })
        .state('samplingReceptionManage', {
          url: '/muestreoRecepciones',
          templateUrl: 'views/sampling/samplingReceptionManage.html',
          controller: 'samplingController'
        })
        /*Reports*/
        .state('reportingProcess', {
          url: '/reporteProceso',
          templateUrl: 'views/report/grill/reportingProcess.html',
          controller: 'reportController'
        })
        .state('producerReport', {
          url: '/reporteProductor',
          templateUrl: 'views/report/producerReport.html',
          controller: 'reportController'
        })
        .state('processInventory', {
          url: '/Inventario de Proceso',
          templateUrl: 'views/report/grill/genericReport.html',
          controller: 'reportController'
        })
        .state('outputs', {
          url: '/Salidas',
          templateUrl: 'views/report/outputs.html',
          controller: 'outputsReportController'
        })
        .state('currentInventory', {
          url: '/InvenarioActualParrillas',
          templateUrl: 'views/report/grill/genericReport.html',
          controller: 'reportController'
        })
        .state('dailyABEL', {
          url: '/reporteDiarioABEL',
          templateUrl: 'views/report/dailyABEL.html',
          controller: 'reportController'
        })
        .state('reportOrigin', {
          url: '/ReporteOrigen',
          templateUrl: 'views/report/reportOrigin.html',
          controller: 'reportController'
        })
        .state('firstFinalSummary', {
          url: '/ResumenFinalPrimeras',
          templateUrl: 'views/report/firstFinalSummary.html',
          controller: 'reportController'
        });

      $urlRouterProvider.otherwise('/');
    })
    .config(function ($httpProvider) {
      /*$httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];*/
      $httpProvider.useApplyAsync(true);
      $httpProvider.interceptors.push('authInterceptorService');
    })
    .config(function (toastrConfig) {
      angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
      });
    })
    .run(['authService', '$rootScope', '$state', '$stateParams', function (authService, $rootScope, $state, $stateParams) {
      authService.fillAuthData();
      $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        authService.isAuthorize();
      });
    }])
    .value('apiPath', 'http://localhost:49278/')
    .constant('accesslvl', {
      admin: 1,
      remRecepUser: 2,
      humidityUser: 3,
      qualityUser: 4,
      grillUser: 5,
      public: 6
    });
})();
