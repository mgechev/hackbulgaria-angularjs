Provider.directive('ngl-controller', function () {
  'use strict';
  return {
    scope: true,
    link: function (el, scope, exp) {
      Provider.get(exp + Provider.CONTROLLERS_SUFFIX, { $scope: scope });
    }
  };
});

