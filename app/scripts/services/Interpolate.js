'use strict';

minerrAppModule
  .factory('Interpolate', function () {

    return {
      interpolate: function (formatString) {
        var formatArgs = arguments;
        return formatString.replace(/\{\d+\}/g, function (match) {
          // Drop the braces and use the unary plus to convert to an integer.
          // The index will be off by one because of the formatString.
          var index = +match.slice(1, -1);
          if (index + 1 >= formatArgs.length) {
            return match;
          }
          return formatArgs[index+1];
        });
      }
    };
  });
