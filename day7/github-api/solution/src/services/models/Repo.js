GitHubStats.factory('Repo',
  function (GITHUB_API, CachableModel, $cacheFactory) {

  var REPO_SUFFIX = 'repos',
      REPO_PREFIX = 'users',
      cache = $cacheFactory('repos');

  function Repo(config) {
    this.name = config.name;
    this.createdAt = config.created_at;
    this.forksCount = config.forks_count;
    this.language = config.language;
    this.starsCount = config.stargazers_count;
    this.url = config.url;
    CachableModel.call(this);
  }

  Repo.get = function (username) {
    return CachableModel.get.call(this, {
        url: GITHUB_API + '/' + REPO_PREFIX +
        '/{{username}}/' + REPO_SUFFIX,
        context: { username: username },
        isArray: true,
        constructor: Repo
      });
  };

  return Repo;
});
