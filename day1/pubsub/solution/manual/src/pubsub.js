var pubsub = {};
(function (q) {
  'use strict';
  var topics = {};
  q.publish = function (topic, args) {
    if (!topics[topic]) {
      return false;
    }
    var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[len].call(null, topic, args);
    }
    return this;
  };
  q.subscribe = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push(func);
    return this;
  };
}(pubsub));
