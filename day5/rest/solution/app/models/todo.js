var todos = [];

function Todo(data) {
  this.id = data.id;
  this.title = data.title;
  this.created = data.created;
  this.until = data.until;
}

Todo.prototype.save = function () {
  var id = todos.push(this);
  this.id = id - 1;
  console.log(this.id);
  return this;
};

Todo.prototype.destroy = function () {
  var todo = todos.splice(this.id, 1);
  return todo;
};

Todo.find = function (id) {
  return todos[id] || null;
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
