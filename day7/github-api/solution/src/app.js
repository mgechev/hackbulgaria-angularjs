var GitHubStats = angular.module('github-stats', ['ngRoute', 'utils']);

GitHubStats.constant('GITHUB_API', 'https://api.github.com');

GitHubStats.config(function ($routeProvider, $httpProvider) {

  $httpProvider.interceptors.push(function (GITHUB_API) {
    var regexp = new RegExp(GITHUB_API);
    return {
      request: function (config) {
        if (regexp.test(config.url)) {
          config.url += '?client_id=8f3b8d572129632cf422&client_secret=f0669941c23378c30fb89f6c37be9075a5628bba';
        }
        return config;
      }
    };
  });

  $routeProvider
    .when('/home', {
      controller: 'HomeCtrl',
      templateUrl: 'partials/home.html'
    })
    .when('/users/:username', {
      controller: 'UserCtrl',
      templateUrl: 'partials/user.html',
      resolve: {
        user: function (User, $route) {
          return User.get($route.current.params.username);
        }
      }
    })
    .when('/repos/:username', {
      controller: 'UserReposCtrl',
      templateUrl: 'partials/user-repos.html',
      resolve: {
        repos: function (User, $route) {
          return User.get($route.current.params.username).repos;
        }
      }
    })

    .otherwise({ redirectTo: '/home' });
});
