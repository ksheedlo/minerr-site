'use strict';

/*jshint -W098*/

var minerrAppModule = angular.module('minerrApp', ['ngResource'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/error/:id', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .when('/error/:namespace/:id', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
