/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, todo) {
  'use strict';

  $scope.todos = todo.getList();

  $scope.add = function () {
    todo.addTodo({
      title: $scope.todoTitle,
      date: new Date(),
    });
    $scope.todoTitle = '';
    $scope.todos = todo.getList();
  };
});
