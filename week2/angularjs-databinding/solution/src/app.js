Provider.controller('MainCtrl', function MainCtrl($scope) {
  'use strict';
  $scope.foo = 42;
});

Provider.controller('ChildCtrl', function ChildCtrl($scope, interval) {
  'use strict';
  $scope.items = [1, 2, 3, 4, 5, 6];
  $scope.alert = function () {
    $scope.items.push($scope.foo++);
  };
});

DOMCompiler.bootstrap();
