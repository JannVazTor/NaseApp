'use strict'
app.controller('signupController',function($scope, $location, authService){
  $scope.savedSuccessfully = false;
  $scope.message = "";

  $scope.registration = {
    userName: "",
    password: "",
    confirmPassword:""
  };

  $scope.signUp = function(){
    authService.saveRegistration($scope.registration).then(function(response){
      $scope.savedSuccessfully = true;
      $scope.message = "El usuario a sido registrado de manera exitosa, Seras redirigido a la pagina del login en 2 segundos..";
      startTime();
    },
    function(response){
      var errors = [];
      for (var key in response.data.modelState) {
        for (var i = 0; i < response.data.modelState[key].length; i++) {
          errors-push(response.data.modelState[key][i]);
        }
      }
      $scope.message = "El registro fallo, detallels: " + errors.join(' ');
    });
  };

  /*var startTimer = function(){
    var timer = $setTimeout(function () {
      $timeout.cancel(timer);
      $location.path('/login');
    }, 2000);
  }*/
});
