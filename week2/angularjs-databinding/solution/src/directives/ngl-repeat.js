Provider.directive('ngl-repeat', function () {
  'use strict';
  return {
    scope: false,
    link: function (el, scope, exp) {
      var scopes = [],
          parts = exp.split('in'),
          collectionName = parts[1].trim(),
          itemName = parts[0].trim();

      function render(val) {
        var els = val,
            currentNode, s,
            parentNode = el.parentNode;

        while (parentNode.firstChild) {
          parentNode.removeChild(parentNode.firstChild);
        }

        scopes.forEach(function (s) {
          s.$destroy();
        });
        scopes = [];
        els.forEach(function (val) {
          currentNode = el.cloneNode();
          currentNode.removeAttribute('ngl-repeat');
          currentNode.removeAttribute('ngl-scope');
          s = scope.$new();
          scopes.push(s);
          s[itemName] = val;
          DOMCompiler.compile(currentNode, s);
          parentNode.appendChild(currentNode);
        });
        el = currentNode;
      }

      scope.$watch(collectionName, render);
      render(scope.$eval(collectionName));
    }
  };
});

