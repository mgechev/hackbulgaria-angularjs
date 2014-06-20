Provider.directive('ngl-model', function () {
  return {
    link:  function (el, scope, exp) {
      el.onkeyup = function () {
        scope[exp] = el.value;
      };
      scope.$watch(exp, function (val) {
        el.value = val;
      });
    }
  };
});
