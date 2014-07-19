GitHubStats.factory('User',
  function (GITHUB_API, req, storage, $cacheFactory, Repo) {
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
    var cached = cache.get(username);
    if (cached) {
      return cached;
    } else {
      return req.get(GITHUB_API + '/' + USERS_PREFIX + '/' + username)
        .then(function (res) {
          var user = new User(res.data);
          cache.put(username, user);
          return user;
        }.bind(this));
    }
  };


  return User;
});
