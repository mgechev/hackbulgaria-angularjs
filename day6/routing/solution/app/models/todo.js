var todos = [],
    counter = 0;

function Todo(data) {
  this.id = data.id;
  this.title = data.title;
  this.created = data.created;
  this.description = data.description;
}

Todo.prototype.save = function () {
  todos.push(this);
  this.id = counter;
  counter += 1;
  return this;
};

Todo.prototype.update = function () {
  todos = todos.map(function (todo) {
    if (todo.id === this.id) {
      return this;
    }
    return todo;
  }, this);
};

Todo.prototype.destroy = function () {
  todos.splice(this.id, 1);
  return this;
};

Todo.find = function (id) {
  return todos.filter(function (todo) {
    return todo.id === id;
  })[0];
};

Todo.getList = function () {
  return todos.map(function (t) {
    return {
      title: t.title,
      id: t.id
    };
  });
};

module.exports = Todo;
