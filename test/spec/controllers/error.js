'use strict';

describe('Controller: ErrorCtrl', function () {

  // load the controller's module
  beforeEach(module('minerrApp'));

  var ErrorCtrl,
    errorDataMock,
    $httpBackend,
    routeParamsMock,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    routeParamsMock = {};

    errorDataMock = {
      'errors': {
        '10': 'Too many arguments',
        '11': 'Bad parameter {0}',
        '12': '{0} requires a {1}',
        'test1': {
          'one': '{0} is not the true {1}'
        },
      }
    };

    // Tests should mock /errors.json http response
    $httpBackend.when('GET', '/errors.json').respond(errorDataMock);
    $httpBackend.expectGET('/errors.json');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('at an error code with no parameters', function () {
    beforeEach(inject(function ($controller) {
      routeParamsMock = { id: '10' };

      ErrorCtrl = $controller('ErrorCtrl', {
        $scope: scope,
        $routeParams: routeParamsMock
      });

      $httpBackend.flush();
    }));
    
    it('should set the error message correctly for the location path', function () {
      expect(scope.errorMessage).toBe('Too many arguments');
    });
  });

  describe('at an error code with parameters', function () {
    beforeEach(inject(function ($controller) {
      routeParamsMock = { id: '12', p0: 'test2', p1: 'test3' };

      ErrorCtrl = $controller('ErrorCtrl', {
        $scope: scope,
        $routeParams: routeParamsMock
      });

      $httpBackend.flush();
    }));
    
    it('should interpolate parameters into an error message', function () {
      expect(scope.errorMessage).toBe('test2 requires a test3');
    });
  });

  describe('at a namespaced error code', function () {
    beforeEach(inject(function ($controller) {
      routeParamsMock = { namespace: 'test1', id: 'one', p0: 'Zen', p1: 'Buddha' };

      ErrorCtrl = $controller('ErrorCtrl', {
        $scope: scope,
        $routeParams: routeParamsMock
      });

      $httpBackend.flush();
    }));

    it('should interpolate parameters for the correct error message', function () {
      expect(scope.errorMessage).toBe('Zen is not the true Buddha');
    });
  });
});
