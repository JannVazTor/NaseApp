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
      'ngTouch',
      'LocalStorageModule',
      'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'loginController'
        })
        .state('users', {
          url: '/users',
          templateUrl: 'views/users.html',
          controller: 'userController'
        })
        .state('producers', {
          url: '/producers',
          templateUrl: 'views/producers.html',
          controller: 'producerController'
        })
        .state('home',{
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('receptionAdd',{
          url: '/reception',
          templateUrl: 'views/reception/receptionAdd.html',
          controller: 'receptionController'
        })
        .state('receptionManage',{
          url: '/receptionM',
          templateUrl: 'views/reception/receptionManage.html',
          controller: 'receptionController'
        })
        .state('cylinder',{
          url: '/cylinder',
          templateUrl: 'views/cylinder.html',
          controller: 'cylinderController'
        })
        .state('remissionManage',{
          url: '/remissionM',
          templateUrl: 'views/remission/remissionManage.html',
          controller: 'remissionController'
        })
        .state('remissionAdd',{
          url: '/remission',
          templateUrl: 'views/remission/remissionAdd.html',
          controller: 'remissionController'
        })
        .state('receptionUpdate',{
          url: '/receptionU',
          templateUrl: 'views/receptionUpdate.html',
          controller: 'receptionController'})
        .state('grillAdd',{
          url: '/grillA',
          templateUrl: 'views/grill/grillAdd.html',
          controller: 'grillController'
        })
        .state('grillManage',{
          url: '/grillM',
          templateUrl: 'views/grill/grillManage.html',
          controller: 'grillController'
        })
        .state('sampling',{
          url: '/sampling',
          templateUrl: 'views/sampling.html',
          controller: 'samplingController'
        })
        .state('grillIssue',{
          url: '/grillI',
          templateUrl: 'views/grill/grillIssue.html',
          controller: 'grillController'
        })
        .state('grillInvAct',{
          url: '/grillIA',
          templateUrl: 'views/grill/grillInvAct.html',
          controller: 'grillController'
        });
      $urlRouterProvider.otherwise('/');
    })
    .config(function ($httpProvider) {/*
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];*/
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
