var Provider = {
  get: function (name, locals) {
    'use strict';
    if (this._cache[name]) {
      return this._cache[name];
    }
    var provider = this._providers[name];
    if (!provider || typeof provider !== 'function') {
      return null;
    }
    return (this._cache[name] = this.invoke(provider(), locals));
  },
  _cache: { $rootScope: new Scope() },
  _providers: {},
  directive: function (name, fn) {
    'use strict';
    this._register(name + Provider.DIRECTIVES_SUFFIX, fn);
  },
  controller: function (name, fn) {
    'use strict';
    this._register(name + Provider.CONTROLLERS_SUFFIX, fn);
  },
  service: function (name, fn) {
    'use strict';
    this._register(name, fn);
  },
  _register: function (name, service) {
    'use strict';
    this._providers[name] = function () {
      return service;
    };
  },
  annotate: function (fn) {
    'use strict';
    var res = fn.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
        .match(/function.*?\((.*?)\)/);
    if (res && res[1]) {
      return res[1].split(',').map(function (d) {
        return d.trim();
      });
    }
    return [];
  },
  invoke: function (fn, locals) {
    'use strict';
    locals = locals || {};
    var deps = this.annotate(fn);
    deps = deps.map(function (s) {
      if (locals[s]) {
        return locals[s];
      } else {
        return this.get(s, locals);
      }
    }.bind(this));
    return fn.apply(null, deps);
  }
};

Provider.DIRECTIVES_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

