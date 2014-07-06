/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, Todo) {
  'use strict';

  $scope.todos = Todo.query();

  $scope.add = function () {
    new Todo({
      title: $scope.todoTitle,
      created: new Date(),
      until: new Date($scope.todoDate + '/' + $scope.todoTime)
    }).$save();
    $scope.todoTitle = '';
    $scope.todoDate = '';
    $scope.todoTime = '';
    $scope.todos = Todo.query();
  };

  $scope.remove = function (todo) {
    todo.$delete({ id: todo.id });
    $scope.todos = Todo.query();
  };

  $scope.details = function (id) {
    $scope.todo = Todo.get({ id: id });
  };
});
