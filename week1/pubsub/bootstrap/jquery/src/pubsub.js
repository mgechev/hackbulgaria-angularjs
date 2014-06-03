/* global jQuery */

var pubsub = {};

(function (ps, $) {
  'use strict';
  var temp = $({});
  ps.publish = function (evnt, data) {
    temp.trigger(evnt, data);
  };
  ps.subscibe = function (evnt, fn) {
    temp.on(evnt, fn);
  };
}(pubsub, jQuery));
