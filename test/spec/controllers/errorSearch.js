'use strict';

describe('Controller: ErrorSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('minerrApp'));

  var ErrorSearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ErrorSearchCtrl = $controller('ErrorSearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
