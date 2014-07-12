/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, todo) {
  'use strict';
  console.log(todo);
  $scope.todo = todo;
});
