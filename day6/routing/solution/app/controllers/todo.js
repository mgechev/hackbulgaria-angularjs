var Todo = require('../models/todo');

exports.todo = function (req, res) {
  var todo = Todo.find(req.params.id);
  res.json(todo);
};

exports.list = function (req, res) {
  var todos = Todo.getList();
  res.json(todos);
};

exports.save = function (req, res) {
  var todo = new Todo(req.body);
  // update
  if (todo.id) {
    todo.update();
  } else {
    todo.save();
  }
  res.json(todo);
};

exports.delete = function (req, res) {
  var todo = new Todo.find(req.params.id);
  res.json(todo.destroy());
};