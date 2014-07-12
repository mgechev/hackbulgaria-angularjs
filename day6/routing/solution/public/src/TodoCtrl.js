/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, Todo, todo) {
  'use strict';
  $scope.todo = new Todo(todo);

  $scope.update = function () {
    $scope.todo.update();
  };

  $scope.save = function () {
    $scope.todo.save();
  };

  $scope.remove = function () {
    $scope.todo.destroy();
  };
});