'use strict';

minerrAppModule
  .controller('ErrorCtrl', ['$scope', '$resource', '$routeParams', 'Error', 'Interpolate',
    function ($scope, $resource, $routeParams, Error, Interpolate) {
      var errorData, getTemplate;

      $scope.errorMessage = '';

      getTemplate = function () {
        if ($routeParams.namespace) {
          return errorData.errors[$routeParams.namespace][$routeParams.id];
        }
        return errorData.errors[$routeParams.id];
      };

      errorData = Error.get(function () {
        var interpolateArgs = [getTemplate()], index;

        for (index = 0; $routeParams['p'+index]; index++) {
          interpolateArgs.push($routeParams['p'+index]);
        }
        $scope.errorMessage = Interpolate.interpolate.apply(Interpolate, interpolateArgs);
      });
    }]);
