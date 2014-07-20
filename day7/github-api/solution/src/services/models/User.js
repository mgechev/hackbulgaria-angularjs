GitHubStats.factory('User',
  function (GITHUB_API, CachableModel, storage, $cacheFactory, Repo) {
  'use strict';

  var USERS_PREFIX = 'users',
      cache = $cacheFactory('users'),
      usernamesList = storage.get('users') || [];

  function User(config) {
    this.username = config.login;
    this.avatarUrl = config.avatar_url;
    this.createdAt = config.created_at;
    this.followers = config.followers;
    this.following = config.following;
    this.type = config.type;
    this.htmlUrl = config.html_url;
    Object.defineProperty(this, 'repos', {
      get: function () {
        return Repo.get(this.username);
      }.bind(this)
    });
    CachableModel.call(this);
  }

  User.getUsernames = function () {
    return usernamesList;
  };

  User.addUsername = function (username) {
    usernamesList.push(username);
    storage.put('users', usernamesList);
  };

  User.removeUsername = function (username) {
    usernamesList.splice(usernamesList.indexOf(username), 1);
    storage.put('users', usernamesList);
  };

  User.get = function (username) {
    return CachableModel.get.call(this,
      GITHUB_API + '/' + USERS_PREFIX + '/{{username}}',
      { username: username }, User);
  };

  User.prototype = Object.create(CachableModel.prototype);

  return User;
});
