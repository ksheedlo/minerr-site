'use strict';

var minerAppModule = angular.module('minerrApp', ['ngResource'])
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
      .otherwise({
        redirectTo: '/'
      });
  }]);
