/* global Provider, document */

var DOMCompiler = DOMCompiler || {
  bootstrap: function () {
    'use strict';
    this.compile(document.children[0],
      Provider.get('$rootScope'));
  },
  compile: function (el, scope) {
    'use strict';
    var dirs = this._getElDirectives(el),
        dir, scopeCreated;
    for (var i = 0; i < dirs.length; i += 1) {
      dir = Provider.get(dirs[i].name + Provider.DIRECTIVES_SUFFIX);
      if (dir.scope && !scopeCreated) {
        scope = scope.$new();
        scopeCreated = true;
      }
      dir.link(el, scope, dirs[i].value);
    }
    var children = Array.prototype.slice.call(el.children).map(function (c) {
      return c;
    });
    for (i = 0; i < children.length; i += 1) {
      this.compile(el.children[i], scope);
    }
  },
  _getElDirectives: function (el) {
    'use strict';
    var attrs = el.attributes,
        result = [];
    for (var i = 0; i < attrs.length; i += 1) {
      if (Provider.get(attrs[i].name + Provider.DIRECTIVES_SUFFIX)) {
        result.push({
          name: attrs[i].name,
          value: attrs[i].value
        });
      }
    }
    return result;
  }
};

