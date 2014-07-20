GitHubStats.controller('UsersStatsCtrl', function ($scope, users) {
  var rows = users.map(function (user) {
    return {
      c: [{
        v: user.username
      }, {
        v: user.followers
      }]
    };
  });

  $scope.chartObject = {
    "type": "BarChart",
    "displayed": true,
    "data": {
      "cols": [
        {
          "id": "user",
          "label": "User",
          "type": "string",
          "p": {}
        },
        {
          "id": "followers",
          "label": "Followers",
          "type": "number",
          "p": {}
        }
      ],
      "rows": rows,
    },
    "options": {
      "title": "Followers per user",
      "fill": 20,
      "displayExactValues": true,
      "vAxis": {
        "title": "Users",
        "gridlines": {
          "count": 10
        }
      },
      "hAxis": {
        "title": "Followers"
      }
    },
    "formatters": {}
  }
});
