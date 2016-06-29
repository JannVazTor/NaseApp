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
      'ngMaterial',
      'ui.bootstrap.datetimepicker'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'loginController'
        })
        .state('users', {
          url: '/usuarios',
          templateUrl: 'views/users.html',
          controller: 'userController'
        })
        .state('producers', {
          url: '/productores',
          templateUrl: 'views/producers.html',
          controller: 'producerController'
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
        .state('receptionUpdate',{
          url: '/receptionModificar',
          templateUrl: 'views/reception/receptionUpdate.html',
          controller: 'receptionController'})
        /*Remissions*/
        .state('remissionManage', {
          url: '/remisionGestion',
          templateUrl: 'views/remission/remissionManage.html',
          controller: 'remissionController',
          onExit: function($stateParams, $state, receptionAndGrillService){
            $state.transition.then(toState => {
                receptionAndGrillService.addGrillToReception = true;
            })
          }
        })
        .state('remissionAdd', {
          url: '/remisionAlta',
          templateUrl: 'views/remission/remissionAdd.html',
          controller: 'remissionController'
        })
        .state('remissionUpdate',{
          url: '/remisionModificar',
          templateUrl: 'views/remission/remissionUpdate.html',
          controller: 'remissionController'
        })
        .state('receptionUpdate',{
          url: '/receptionU',
          templateUrl: 'views/reception/receptionUpdate.html',
          controller: 'receptionController'
        })
        .state('grillAdd',{
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
          controller: 'grillController'
        })
        .state('grillInvAct', {
          url: '/grillIA',
          templateUrl: 'views/grill/grillInvAct.html',
          controller: 'grillController'
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
    .run(['authService', function (authService) {
      authService.fillAuthData();
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
