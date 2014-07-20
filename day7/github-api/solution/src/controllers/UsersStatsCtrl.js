GitHubStats.controller('UsersStatsCtrl', function ($scope, users) {
  var userFollowers = users.map(function (user) {
    return {
      c: [{
        v: user.username
      }, {
        v: user.followers
      }]
    };
  });

  var userFollowing = users.map(function (user) {
    return {
      c: [{
        v: user.username
      }, {
        v: user.following
      }]
    };
  });


  $scope.userFollowers = {
    'type': 'BarChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'user',
          'label': 'User',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'followers',
          'label': 'Followers',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': userFollowers,
    },
    'options': {
      'title': 'Followers per user',
      'fill': 20,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 10
        }
      },
      'hAxis': {
        'title': 'Followers'
      }
    },
    'formatters': {}
  };

  $scope.userFollowing = {
    'type': 'BarChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'user',
          'label': 'User',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'following',
          'label': 'Following',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': userFollowing,
    },
    'options': {
      'title': 'User following',
      'fill': 20,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 10
        }
      },
      'hAxis': {
        'title': 'Following'
      }
    },
    'formatters': {}
  }

});
