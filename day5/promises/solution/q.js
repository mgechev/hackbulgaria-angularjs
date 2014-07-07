'use strict';

var STATES = {
  CLEAN: 0,
  RESOLVED: 1,
  REJECTED: 2
};

function Promise() {
  this._done = [];
  this._fail = [];
  this._state = STATES.CLEAN;
  this._resolveData = null;
  this._rejectData = null;
}

Promise.prototype.done = function (cb) {
  this._done.push(cb);
  if (this._state === STATES.RESOLVED) {
    cb(this._resolveData);
  }
};

Promise.prototype.fail = function (cb) {
  this._fail.push(cb);
  if (this._state === STATES.REJECTED) {
    cb(this._rejectData);
  }
};

function Deferred() {
  this.promise = new Promise();
}

Deferred.prototype.resolve = function (data) {
  if (this.promise._state !== STATES.CLEAN) {
    throw new Error('The promise is already resolved or rejected');
  }
  this.promise._state = STATES.RESOLVED;
  this.promise._resolveData = data;
  this.promise._done.forEach(function (cb) {
    if (typeof cb === 'function') {
      cb(data);
    }
  });
};

Deferred.prototype.reject = function (data) {
  if (this.promise._state !== STATES.CLEAN) {
    throw new Error('The promise is already resolved or rejected');
  }
  this.promise._state = STATES.REJECTED;
  this.promise._rejectData = data;
  this.promise._fail.forEach(function (cb) {
    if (typeof cb === 'function') {
      cb(data);
    }
  });
};

var Q = (function () {
  return {
    defer: function () {
      return new Deferred();
    },
    all: function (deferreds) {
      var arr = [],
          deferred = this.defer(),
          resolved = 0;
      deferreds.forEach(function (promise, i) {
        promise.done(function (data) {
          arr[i] = data;
          resolved += 1;
          if (resolved >= deferreds.length) {
            deferred.resolve(arr);
          }
        });
        promise.fail(function (data) {
          deferred.reject(data);
        });
      });
      return deferred.promise;
    },
    when: function (data) {
      var deferred = this.defer();
      deferred.resolve(data);
      return deferred.promise;
    }
  };
}());