'use strict';

minerrAppModule
  .factory('Error', ['$resource', '$timeout', function ($resource, $timeout) {
    var errorResource = $resource('/errors.json'),
      errorData,
      errorPromise,
      errorCallbacks = [],
      successCallbacks = [];

    return {
      get: function (success, error) {
        if (errorData === undefined) {
          if (error) {
            errorCallbacks.push(error);
          }
          if (success) {
            successCallbacks.push(success);
          }

          if (errorPromise === undefined) {
            errorPromise = errorResource.get(function () {
                // General success handler: Call all registered success handlers
                var that = this,
                  thatArgs = arguments;

                errorData = errorPromise;
                angular.forEach(successCallbacks, function (callback) {
                  callback.apply(that, thatArgs);
                });
                successCallbacks = [];
                errorCallbacks = [];
              }, function () {
                // General error handler: Call all registered error handlers
                var that = this,
                  thatArgs = arguments;

                angular.forEach(errorCallbacks, function (callback) {
                  callback.apply(that, thatArgs);
                });
                successCallbacks = [];
                errorCallbacks = [];
              });
          }
          return errorPromise;
        }
        // Call the success callback async to make sure data is returned first
        $timeout(success, 0);
        return errorData;
      }
    };
  }]);
