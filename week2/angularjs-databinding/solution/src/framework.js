function Scope(parent, id) {
  'use strict';
  this.$$watchers = [];
  this.$$children = [];
  this.$parent = parent;
  this.$id = id || 0;
}

Scope.prototype.$watch = function (exp, fn) {
  'use strict';
  this.$$watchers.push({
    exp: exp,
    fn: fn,
    last: this.$eval(exp)
  });
};

Scope.prototype.$eval = function (exp) {
  'use strict';
  var val;
  if (typeof exp === 'function') {
    val = exp.call(this);
  } else {
    if ((/\(\)$/).test(exp)) {
      exp = exp.replace(/\(\)$/, '');
      val = this[exp]();
    } else {
      val = this[exp];
    }
  }
  return val;
};

Scope.prototype.$new = function () {
  'use strict';
  var obj = new Scope(this, this.$id + 1);
  Object.setPrototypeOf(obj, this);
  this.$$children.push(obj);
  return obj;
};

Scope.prototype.$digest = function () {
  'use strict';
  var dirty = true,
      watcher, current, i;
  while (dirty) {
    dirty = false;
    for (i = 0; i < this.$$watchers.length; i += 1) {
      watcher = this.$$watchers[i];
      current = this.$eval(watcher.exp);
      if (watcher.last !== current) {
        watcher.last = current;
        dirty = true;
        watcher.fn(current);
      }
    }
  }
  for (i = 0; i < this.$$children.length; i += 1) {
    this.$$children[i].$digest();
  }
};

var DirectiveRegistry = {
  _directives: [],
  hasDirective: function (dir) {
    'use strict';
    return !!this._directives[dir];
  },
  getDirective: function (name) {
    'use strict';
    return this._directives[name];
  },
  registerDirective: function (name, directive) {
    'use strict';
    this._directives[name] = directive;
  }
};

var ServiceRegistry = {
  getService: function (name) {
    'use strict';
    if (this._cache[name]) {
      return this._cache[name];
    }
    var service = this._services[name];
    if (!service || typeof service !== 'function') {
      return null;
    }
    return (this._cache[name] = Injector.invoke(service));
  },
  _cache: { $rootScope: new Scope() },
  _services: {},
  registerService: function (name, factory) {
    'use strict';
    this._services[name] = factory;
  }
};

var Injector = {
  annotate: function (fn) {
    'use strict';
    var res = fn.toString().match(/function.*?\((.*?)\)/);
    if (res && res[1]) {
      return res[1].split(',').map(function (d) {
        return d.trim();
      });
    }
    return [];
  },
  getService: function (name, locals) {
    'use strict';
    if (locals[name]) {
      return locals[name];
    }
    return ServiceRegistry.getService(name);
  },
  invoke: function (fn, locals) {
    'use strict';
    locals = locals || [];
    var deps = this.annotate(fn);
    deps = deps.map(function (s) {
      return this.getService(s, locals);
    }.bind(this));
    return fn.apply(null, deps);
  }
};

ServiceRegistry.registerService('$timeout', function ($rootScope) {
  'use strict';
  return function (fn, timeout) {
    setTimeout(function () {
      fn();
      $rootScope.$digest();
    }, timeout);
  };
});

ServiceRegistry.registerService('$interval', function ($rootScope) {
  'use strict';
  return function (fn, timeout) {
    setInterval(function () {
      fn();
      $rootScope.$digest();
    }, timeout);
  };
});

/*f-controller*/
DirectiveRegistry.registerDirective('f-controller', {
  scope: true,
  link: function (el, scope, exp) {
    'use strict';
    Injector.invoke(window[exp], { $scope: scope });
  }
});

DirectiveRegistry.registerDirective('f-click', {
  scope: false,
  link: function (el, scope, exp) {
    'use strict';
    el.onclick = function () {
      scope.$eval(exp);
      scope.$digest();
    };
  }
});

DirectiveRegistry.registerDirective('f-bind', {
  scope: false,
  link: function (el, scope, exp) {
    'use strict';
    el.innerHTML = scope.$eval(exp);
    scope.$watch(exp, function (val) {
      el.innerHTML = val;
    });
  }
});

function MainCtrl($scope) {
  'use strict';
  $scope.foo = 42;
}

function ChildCtrl($scope, $interval) {
  'use strict';
  $interval(function () {
    $scope.foo += 1;
  }, 1000);
  $scope.alert = function () {
    $scope.foo += 1;
  };
}

var DOMCompiler = {
  compile: function () {
    'use strict';
    this._compile(document.children[0],
      ServiceRegistry.getService('$rootScope'));
  },
  _getElDirectives: function (el) {
    'use strict';
    var attrs = el.attributes,
        result = [];
    for (var i = 0; i < attrs.length; i += 1) {
      if (DirectiveRegistry.hasDirective(attrs[i].name)) {
        result.push({
          name: attrs[i].name,
          value: attrs[i].value
        });
      }
    }
    return result;
  },
  _compile: function (el, scope) {
    'use strict';
    var dirs = this._getElDirectives(el),
        dir, scopeCreated;
    for (var i = 0; i < dirs.length; i += 1) {
      dir = DirectiveRegistry.getDirective(dirs[i].name);
      if (dir.scope && !scopeCreated) {
        scope = scope.$new();
        el.setAttribute('f-scope', true);
        scopeCreated = true;
      }
      dir.link(el, scope, dirs[i].value);
    }
    for (i = 0; i < el.children.length; i += 1) {
      this._compile(el.children[i], scope);
    }
  }
};

DOMCompiler.compile();
