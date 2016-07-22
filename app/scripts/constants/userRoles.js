(function(){
    'use strict'
    angular.module('naseNutAppApp')
    .constant('USER_ROLES', {
      admin: 'admin',
      remRecepUser: 'remRecepUser',
      humidityUser: 'humidityUser',
      qualityUser: 'qualityUser',
      grillUser: 'grillUser'
    });
})();