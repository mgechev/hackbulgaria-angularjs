var DOMCompiler = {
  bootstrap: function () {
    'use strict';
    this.compile(document.children[0],
      Provider.get('$rootScope'));
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
  },
  compile: function (el, scope) {
    'use strict';
    var dirs = this._getElDirectives(el),
        dir, scopeCreated;
    if (!el.getAttribute('ngl-scope')) {
      el.setAttribute('ngl-scope', scope.$id);
    }
    if (el.getAttribute('ngl-scope') != scope.$id) {
      scope = Provider.get('$rootScope')
        .getChildScopeById(el.getAttribute('ngl-scope'));
    }
    for (var i = 0; i < dirs.length; i += 1) {
      dir = Provider.get(dirs[i].name + Provider.DIRECTIVES_SUFFIX);
      console.log(dir);
      if (dir.scope && !scopeCreated) {
        scope = scope.$new();
        el.setAttribute('ngl-scope', true);
        scopeCreated = true;
      }
      dir.link(el, scope, dirs[i].value);
    }
    for (i = 0; i < el.children.length; i += 1) {
      this.compile(el.children[i], scope);
    }
  }
};

