GitHubStats.controller('UserReposCtrl', function ($scope, repos, user) {
  $scope.gridOptions =
    { data: 'repos',
      columnDefs: [
        { field: 'name', displayName: 'Name' },
        { field: 'starsCount', displayName: 'Stargazers' },
        { field: 'createdAt', displayName: 'Created at' }
      ]
    };
  $scope.repos = repos;
  $scope.user = user;
});
