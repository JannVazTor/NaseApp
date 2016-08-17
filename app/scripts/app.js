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
    .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'loginController',
          data: {
            roles: []
          }
        })
        .state('accessDenied', {
          url: '/accesoDenegado',
          templateUrl: 'views/accesDenied.html',
          data: {
            roles: []
          }
        })
        .state('users', {
          url: '/usuarios',
          templateUrl: 'views/users.html',
          controller: 'userController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('producersAndVarieties', {
          url: '/productoresYvariedades',
          templateUrl: 'views/producersAndVarieties.html',
          controller: 'producerAndVarietiesController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'homeController',
          data: {
            roles: [USER_ROLES.admin, USER_ROLES.remRecepUser, USER_ROLES.humidityUser, USER_ROLES.grillUser, USER_ROLES.qualityUser]
          }
        })
        .state('userProfile', {
          url: '/usuarioPerfil',
          templateUrl: 'views/userProfile.html',
          controller: 'userController',
          data: {
            roles: [USER_ROLES.admin, USER_ROLES.remRecepUser, USER_ROLES.humidityUser, USER_ROLES.grillUser, USER_ROLES.qualityUser]
          }
        })
        .state('cylinder', {
          url: '/cilindros',
          templateUrl: 'views/cylinder.html',
          controller: 'cylinderController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        /*Receptions*/
        .state('receptionAdd', {
          url: '/recepcionAlta',
          templateUrl: 'views/reception/receptionAdd.html',
          controller: 'receptionController',
          data: {
            roles: [USER_ROLES.remRecepUser, USER_ROLES.admin]
          }
        })
        .state('receptionManage', {
          url: '/recepcionGestion',
          templateUrl: 'views/reception/receptionManage.html',
          controller: 'receptionController',
          data: {
            roles: [USER_ROLES.remRecepUser, USER_ROLES.admin]
          }
        })
        .state('receptionUpdate', {
          url: '/receptionModificar',
          templateUrl: 'views/reception/receptionUpdate.html',
          controller: 'receptionController',
          data: {
            roles: [USER_ROLES.remRecepUser, USER_ROLES.admin]
          }
        })
        /*Remissions*/
        .state('remissionManage', {
          url: '/remisionGestion',
          templateUrl: 'views/remission/remissionManage.html',
          controller: 'remissionController',
          data: {
            roles: [USER_ROLES.remRecepUser, USER_ROLES.admin]
          }
        })
        .state('remissionAdd', {
          url: '/remisionAlta',
          templateUrl: 'views/remission/remissionAdd.html',
          controller: 'remissionController',
          data: {
            roles: [USER_ROLES.remRecepUser, USER_ROLES.admin]
          }
        })
        .state('remissionUpdate', {
          url: '/remisionModificar',
          templateUrl: 'views/remission/remissionUpdate.html',
          controller: 'remissionController',
          data: {
            roles: [USER_ROLES.remRecepUser, USER_ROLES.admin]
          }
        })
        /*Grills*/
        .state('grillAdd', {
          url: '/parrillasAlta',
          templateUrl: 'views/grill/grillAdd.html',
          controller: 'grillController',
          data: {
            roles: [USER_ROLES.grillUser, USER_ROLES.admin]
          }
        })
        .state('grillManage', {
          url: '/parrillasGestion',
          templateUrl: 'views/grill/grillManage.html',
          controller: 'grillController',
          data: {
            roles: [USER_ROLES.grillUser, USER_ROLES.admin]
          }
        })
        .state('grillIssue', {
          url: '/inventarioSalidas',
          templateUrl: 'views/grill/grillIssue.html',
          controller: 'grillIssueController',
          data: {
            roles: [USER_ROLES.grillUser, USER_ROLES.admin]
          }
        })
        .state('grillCurrentInv', {
          url: '/parrillasInventarioActual',
          templateUrl: 'views/grill/grillCurrentInv.html',
          controller: 'grillController',
          data: {
            roles: [USER_ROLES.grillUser, USER_ROLES.admin]
          }
        })
        .state('grillUpdate', {
          url: '/modificarParrilla',
          templateUrl: 'views/grill/grillUpdate.html',
          controller: 'grillController',
          data: {
            roles: [USER_ROLES.grillUser, USER_ROLES.admin]
          }
        })
        /*Humidity*/
        .state('humidityAdd', {
          url: '/humedad',
          templateUrl: 'views/humidity/humidityAdd.html',
          controller: 'humidityController',
          data: {
            roles: [USER_ROLES.humidityUser, USER_ROLES.admin]
          }
        })
        .state('humidityManage', {
          url: '/humedadM',
          templateUrl: 'views/humidity/humidityManage.html',
          controller: 'humidityController',
          data: {
            roles: [USER_ROLES.humidityUser, USER_ROLES.admin]
          }
        })
        .state('humidityAddToReception', {
          url: '/agregarHumedad',
          templateUrl: 'views/humidity/humidityAddToCylinder.html',
          controller: 'humidityController',
          data: {
            roles: [USER_ROLES.humidityUser, USER_ROLES.admin]
          }
        }).
        state('humidityLastSamplings', {
          ulr: '/ultimasHumedades',
          templateUrl: 'views/humidity/humidityLastSamplings.html',
          controller: 'humidityController',
          data: {
            roles: [USER_ROLES.humidityUser, USER_ROLES.admin]
          }
        })
        /*Sampling*/
        .state('samplingGrillManage', {
          url: '/muestreoParrillas',
          templateUrl: 'views/sampling/samplingGrillManage.html',
          controller: 'samplingController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        .state('samplingAdd', {
          url: '/agregarMuestreo',
          templateUrl: 'views/sampling/samplingAdd.html',
          controller: 'samplingController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        .state('samplingUpdate', {
          url: '/modificarMuestreo',
          templateUrl: 'views/sampling/samplingUpdate.html',
          controller: 'samplingController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        /*ProcessResult*/
        .state('processResult', {
          url: '/resultadoProceso',
          templateUrl: 'views/processResult/processResult.html',
          controller: 'processResultController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        .state('processResultAdd', {
          url: '/agregarResultadoProceso',
          templateUrl: 'views/processResult/processResultAdd.html',
          controller: 'processResultController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        .state('processResultManage', {
          url: '/resultadosProceso',
          templateUrl: 'views/processResult/processResultManage.html',
          controller: 'processResultController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        .state('processResultSampling', {
          url: '/muestreoRecepciones',
          templateUrl: 'views/sampling/samplingAdd.html',
          controller: 'processResultController',
          data: {
            roles: [USER_ROLES.qualityUser, USER_ROLES.admin]
          }
        })
        /*Reports*/
        .state('reportingProcess', {
          url: '/reporteProceso',
          templateUrl: 'views/report/grill/reportingProcess.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('producerReport', {
          url: '/reporteProductor',
          templateUrl: 'views/report/producerReport.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('processInventory', {
          url: '/Inventario de Proceso',
          templateUrl: 'views/report/genericReport.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('grillIssues', {
          url: '/parrillasSalidas',
          templateUrl: 'views/report/grill/grillIssuesReport.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('currentInventory', {
          url: '/InvenarioActualParrillas',
          templateUrl: 'views/report/genericReport.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('dailyReport', {
          url: '/reporteDiario',
          templateUrl: 'views/report/dailyReport.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('reportOrigin', {
          url: '/reporteOrigen',
          templateUrl: 'views/report/reportOrigin.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('firstFinalSummary', {
          url: '/ResumenFinalPrimeras',
          templateUrl: 'views/report/firstFinalSummary.html',
          controller: 'reportController',
          data: {
            roles: [USER_ROLES.admin]
          }
        })
        .state('secondGrillCurrent',{
          url: '/InventarioActualParrillasSegunda',
          templateUrl: 'views/report/SecondCurrentInv.html',
          controller: 'reportController',
          data:{
            roles: [USER_ROLES.admin]
          }
        })
        .state('field', {
          url: '/campos',
          templateUrl: 'views/field.html',
          controller: 'fieldController',
          data: {
            roles: [USER_ROLES.admin]
          }
        });
      $urlRouterProvider.otherwise('/home');
    })
    .config(function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
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
    .run(['authService', '$rootScope', '$state', '$stateParams', 'AUTH_EVENTS', function (authService, $rootScope, $state, $stateParams, AUTH_EVENTS) {
      authService.fillAuthData();
      $rootScope.$on('$stateChangeStart', function (event, next, toParams, prev) {
        $rootScope.prevState = prev.name;
        var authorizaedRoles = next.data.roles;
        if (authorizaedRoles.length > 0) {
          if (!authService.isInRole(authorizaedRoles)) {
            event.preventDefault();
            if (authService.isLoggedIn()) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
          }
        }
      });
    }])
    .value('apiPath', 'http://localhost:49278/');
})();
