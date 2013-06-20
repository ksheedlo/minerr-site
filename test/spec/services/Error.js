'use strict';

describe('Service: Error', function () {

  // load the service's module
  beforeEach(module('minerrApp'));

  // instantiate service
  var Error,
    $httpBackend,
    $timeout,
    successSpy,
    errorSpy,
    errorDataMock;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    Error = $injector.get('Error');
    successSpy = jasmine.createSpy('success');
    errorSpy = jasmine.createSpy('error');
    errorDataMock = { test: 'The answer is 42' };

    $httpBackend.when('GET', '/errors.json').respond({
        test: 'The answer is 42'
      });
    $httpBackend.when('GET', '/errors.json').respond(errorDataMock);      
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should eventually return a result when successful', function () {
    $httpBackend.expectGET('/errors.json');
    var data = Error.get();
    $httpBackend.flush();
    expect(data.test).toEqual('The answer is 42');
  });

  it('should not call any callbacks until the response arrives', function () {
    $httpBackend.expectGET('/errors.json');
    Error.get(successSpy, errorSpy);
    expect(successSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
    $httpBackend.flush();
  });

  it('should call the success callback when the response successfully completes', function () {
    $httpBackend.expectGET('/errors.json');
    Error.get(successSpy, errorSpy);
    $httpBackend.flush();
    expect(successSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should call the error callback when an error occurs', function () {
    $httpBackend.expectGET('/errors.json').respond(404, '');
    Error.get(successSpy, errorSpy);
    $httpBackend.flush();
    expect(errorSpy).toHaveBeenCalled();
    expect(successSpy).not.toHaveBeenCalled();
  });

  it('should return results immediately from the cache', function () {
    var data;

    $httpBackend.expectGET('/errors.json');
    Error.get();
    $httpBackend.flush();
    data = Error.get();
    expect(data.test).toEqual('The answer is 42');
  });

  it('should call the success callback async when the result is cached', function () {
    $httpBackend.expectGET('/errors.json');
    Error.get();
    $httpBackend.flush();
    Error.get(successSpy, errorSpy);
    $timeout.flush();
    expect(successSpy).toHaveBeenCalled();
  });

  it('should call multiple registered success callbacks', function () {
    var successSpy2 = jasmine.createSpy('success2'), 
      errorSpy2 = jasmine.createSpy('error2');

    $httpBackend.expectGET('/errors.json');
    Error.get(successSpy, errorSpy);
    Error.get(successSpy2, errorSpy2);
    $httpBackend.flush();
    expect(successSpy).toHaveBeenCalled();
    expect(successSpy2).toHaveBeenCalled();
  });

  it('should call multiple registered error callbacks', function () {
    var successSpy2 = jasmine.createSpy('success2'), 
      errorSpy2 = jasmine.createSpy('error2');

    $httpBackend.expectGET('/errors.json').respond(404, '');
    Error.get(successSpy, errorSpy);
    Error.get(successSpy2, errorSpy2);
    $httpBackend.flush();
    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy2).toHaveBeenCalled();
  });
});
