/* global Filter */

// Solution 1

//function BWFilter() {
//  'use strict';
//  Filter.apply(this, arguments);
//}
//
//BWFilter.prototype = Object.create(Filter.prototype);
//
//BWFilter.prototype.applyFilter = function (data, current) {
//  'use strict';
//  var r = data[current],
//      g = data[current + 1],
//      b = data[current + 2],
//      v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
//  data[current] = data[current + 1] = data[current + 2] = v;
//};


// Solution 2

//var BWFilter = Object.create(Filter.prototype);
//
//BWFilter.init = function () {
//  'use strict';
//  Filter.apply(this, arguments);
//  return this;
//};
//BWFilter.applyFilter = function (data, current) {
//  'use strict';
//  var r = data[current],
//      g = data[current + 1],
//      b = data[current + 2],
//      v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
//  data[current] = data[current + 1] = data[current + 2] = v;
//};


// Solution 3

var BWFilter = (function () {
  'use strict';

  function applyFilter(data, current) {
    var r = data[current],
        g = data[current + 1],
        b = data[current + 2],
        v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    data[current] = data[current + 1] = data[current + 2] = v;
  }

  return {
    applyFilter: applyFilter,
    init: function () {
      Filter.apply(this, arguments);
      return this;
    }
  };
}());

Object.setPrototypeOf(BWFilter, Filter.prototype);
