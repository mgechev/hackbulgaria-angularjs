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
    last: Utils.clone(this.$eval(exp))
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

Scope.prototype.getChildScopeById = function (id) {
  if (this.$id == id) {
    return this;
  }
  for (var i = 0; i < this.$$children.length; i += 1) {
    return this.$$children[i].getChildScopeById(id);
  }
  return null;
};

Scope.prototype.$new = function () {
  'use strict';
  Scope.counter += 1;
  var obj = new Scope(this, Scope.counter);
  Object.setPrototypeOf(obj, this);
  this.$$children.push(obj);
  return obj;
};

Scope.counter = 0;

Scope.prototype.$destroy = function () {
  'use strict';
  var pc = this.$parent.$$children;
  pc.splice(pc.indexOf(this), 1);
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
      if (!Utils.equals(watcher.last, current)) {
        watcher.last = Utils.clone(current);
        dirty = true;
        watcher.fn(current);
      }
    }
  }
  for (i = 0; i < this.$$children.length; i += 1) {
    this.$$children[i].$digest();
  }
};

