GitHubStats.factory('CachableModel', function ($interpolate, $cacheFactory, $q, req) {
  'use strict';

  var cache = {};

  function CachableModel() {
  }

  CachableModel.get = function (getUrl, context, factory) {
    cache[getUrl] = cache[getUrl] || $cacheFactory(getUrl);
    var url = $interpolate(getUrl)(context);
    var cached = cache[getUrl].get(url);
    if (cached) {
      return $q.when(cached);
    } else {
      return req.get(url)
        .then(function (res) {
          var obj = new factory(res.data);
          cache[getUrl].put(url, obj);
          return obj;
        });
    }
  };

  return CachableModel;
});
