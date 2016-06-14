'use strict'
app.controller('loginController',function($scope, $location, authService){
  $scope.loginData = {
    username: "",
    password: ""
  };

  $scope.message = "";

  $scope.login = function(){
    authService.login($scope.loginData).then(function(response){
        $location.path('/dashboard');
    },
  function(err){
    $scope.message = err.err_description;
  });
  };
});
