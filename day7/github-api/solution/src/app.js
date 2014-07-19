var GitHubStats = angular.module('github-stats', ['ngRoute', 'utils']);

GitHubStats.constant('GITHUB_API', 'https://api.github.com');

GitHubStats.config(function ($routeProvider) {
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
    .otherwise({ redirectTo: '/home' });
});
