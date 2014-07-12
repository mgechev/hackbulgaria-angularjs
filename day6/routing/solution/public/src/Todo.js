/* global TodoApp */

TodoApp.factory('Todo', function ($http, $q) {
  'use strict';
  var todos = null;

  function Todo(data) {
    this.title = data.title;
    this.created = data.date;
    this.until = data.until;
    this.id = data.id;
  }

  Todo.prototype.save = function () {
    var idx = todos.push(this),
        self = this;
    $http.post('/todo', this)
    .then(function (d) {
      self.id = d.data.id;
    });
  };

  Todo.prototype.destroy = function () {
    todos.splice(this.id, 1);
    $http.delete('/todo/' + this.id);
  };

  Todo.getList = function () {
    if (todos) {
      return $q.when(todos);
    }
    return $http.get('/todo')
    .then(function (res) {
      todos = [];
      res.data.forEach(function (t) {
        todos.push(new Todo(t));
      });
      return todos;
    });
  };

  Todo.get = function (id) {
    return $http.get('/todo/' + id)
      .then(function (res) {
        return res.data;
      });
  };

  return Todo;
});
