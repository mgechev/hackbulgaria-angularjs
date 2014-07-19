GitHubStats.factory('req', function ($rootScope, $http, $q) {
  return {
    get: function (url) {
      return $http.get(url)
      .then(function (res) {
        return res;
      }, function (res) {
        $rootScope.$broadcast('error', res.data.message);
        return $q.reject(res.data.message);
      });
    }
  };
});
