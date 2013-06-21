'use strict';

describe('Service: Interpolate', function () {

  // load the service's module
  beforeEach(module('minerrApp'));

  // instantiate service
  var Interpolate;
  beforeEach(inject(function (_Interpolate_) {
    Interpolate = _Interpolate_;
  }));

  it('should return the format string with no parameters', function () {
    expect(Interpolate.interpolate('This is a test')).toBe('This is a test');
  });

  it('should interpolate numbers correctly', function () {
    expect(Interpolate.interpolate('The answer is {0}', 42)).toBe('The answer is 42');
  });

  it('should interpolate strings correctly', function () {
    expect(Interpolate.interpolate('The answer is {0}', '42')).toBe('The answer is 42');
  });

  it('should interpolate parameters in the specified order', function () {
    expect(Interpolate.interpolate('{1} {0}', 'second', 'first')).toBe('first second');
  });

  it('should preserve interpolation markers when fewer arguments than needed are provided', function () {
    expect(Interpolate.interpolate('This {0} is {1} on {2}', 'Fooooo'))
      .toBe('This Fooooo is {1} on {2}');
  });
});
