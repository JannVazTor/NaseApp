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
     'ngRoute',
     'ngSanitize',
     'ngTouch',
     'LocalStorageModule',
     'angular-loading-bar'/*,
     'ngMaterial'*/
   ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'loginController',
      })
      .when('/signup',{
        templateUrl: 'views/signup.html',
        controller: 'signupController'
      })
      .when('/home',{
        templateUrl: 'views/home.html',
        controller: 'homeController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['authService', function(authService){
    authService.fillAuthData();
  }])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptorService');
  })/*
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
  })*/
  .value('apiPath', 'http://localhost:49278/');
