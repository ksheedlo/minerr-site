'use strict';

minerAppModule
  .controller('ErrorCtrl', ['$scope', '$resource', '$routeParams', 'Interpolate', 
    function ($scope, $resource, $routeParams, Interpolate) {
      var Error = $resource('/errors.json'),
        errorData,
        reloadErrorMessage;

      $scope.errorMessage = '';

      errorData = Error.get(function () {
        var interpolateArgs = [errorData.errors[$routeParams.id]], 
          index;
        for (index = 1; $routeParams['p'+index]; index++) {
          interpolateArgs.push($routeParams['p'+index]);
        }
        $scope.errorMessage = Interpolate.interpolate.apply(Interpolate, interpolateArgs);
      });
    }]);
