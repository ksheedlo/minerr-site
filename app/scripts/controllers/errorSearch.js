'use strict';

minerrAppModule
  .controller('ErrorSearchCtrl', ['$scope', 'Error', function ($scope, Error) {
    var collectGlobalNamespacedErrors, collectNamespaces, errorData, flattenErrors;

    flattenErrors = function(errors) {
      // Takes an error object mapping error codes to templates and produces
      // a list of { code: [error code], template: [template string] }
      var results = [];
      for (var prop in errors) {
        if (errors.hasOwnProperty(prop) && angular.isString(errors[prop])) {
          results.push({ code: prop, template: errors[prop] });
        }
      }
      return results;
    };

    collectNamespaces = function(errData) {
      var results = [];
      for (var prop in errData.errors) {
        if (errData.errors.hasOwnProperty(prop) && angular.isObject(errData.errors[prop])) {
          results.push({ namespace: prop, errors: flattenErrors(errData.errors[prop]) });
        }
      }
      return results;
    };

    collectGlobalNamespacedErrors = function (errData) {
      return flattenErrors(errData.errors);
    };

    errorData = Error.get(function () {
        $scope.namespaces = collectNamespaces(errorData);
        $scope.globalErrors = collectGlobalNamespacedErrors(errorData);
      });
  }]);
