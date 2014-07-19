GitHubStats.factory('Repo', function (GITHUB_API, req, $cacheFactory) {

  var REPO_SUFFIX = 'repos',
      REPO_PREFIX = 'users',
      cache = $cacheFactory('repos');

  function Repo() {
  }

  Repo.get = function (username) {
    var cached = cache.get(username);
    if (cached) {
      return cached;
    } else {
      return req.get(GITHUB_API + '/' + REPO_PREFIX +
        '/' + username + '/' + REPO_SUFFIX)
        .then(function (res) {
          var repo = new Repo(res.data);
          cache.put(username, repo);
          return repo;
        }.bind(this));
    }
  };

  return Repo;
});
