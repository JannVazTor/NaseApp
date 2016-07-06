(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name naseNutAppApp
   * @description
   * # naseNutAppApp
   *
   * Main module of the application.
   */
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
      'toastr'
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
<<<<<<< HEAD
        .state('grillAdd',{
=======
        .state('grillAdd', {
>>>>>>> origin/master
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
<<<<<<< HEAD
        .state('humidity',{
          url: '/humidity',
          templateUrl: 'views/humidity.html',
          controller: 'humidityController'
        })
        .state('grillInvAct', {
          url: '/grillIA',
          templateUrl: 'views/grill/grillInvAct.html',
          controller: 'grillController'
=======
        .state('grillCurrentInv', {
          url: '/parrillasInventarioActual',
          templateUrl: 'views/grill/grillCurrentInv.html',
          controller: 'grillCurrentInvController'
>>>>>>> origin/master
        })
        .state('grillUpdate', {
          url: '/grillU',
          templateUrl: 'views/grill/grillUpdate.html',
          controller: 'grillController'
        })
        .state('samplingManage', {
          url: '/samplingM',
          templateUrl: 'views/sampling/samplingManage.html',
          controller: 'samplingController'
        })
        .state('samplingAdd', {
          url: '/samplingA',
          templateUrl: 'views/sampling/samplingAdd.html',
          controller: 'samplingController'
        })
        .state('samplingUpdate', {
          url: '/samplingU',
          templateUrl: 'views/sampling/samplingUpdate.html',
          controller: 'samplingController'
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
