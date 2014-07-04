/* global TodoApp */

TodoApp.service('todo', function (storage) {
  'use strict';

  this._todos = storage.get('todos') || [];

  this.getList = function () {
    return this._todos.map(function (todo, idx) {
      return {
        title: todo.title,
        id: idx,
        completed: todo.completed
      };
    });
  };

  this.addTodo = function (todo) {
    this._todos.push(todo);
    storage.put('todos', this._todos);
  };

  this.removeTodo = function (idx) {
    this._todos.splice(idx, 1);
    storage.put('todos', this._todos);
  };
});
