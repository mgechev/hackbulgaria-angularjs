GitHubStats.factory('Repo',
  function (GITHUB_API, CachableModel, $cacheFactory) {

  var REPO_SUFFIX = 'repos',
      REPO_PREFIX = 'users',
      cache = $cacheFactory('repos');

  function Repo(config) {
    console.log(config);
    CachableModel.call(this);
  }

  Repo.get = function (username) {
    return CachableModel.get.call(this,
      GITHUB_API + '/' + REPO_PREFIX +
      '/{{username}}/' + REPO_SUFFIX,
      { username: username }, Repo);
  };

  return Repo;
});
