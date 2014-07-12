/* global TodoApp */

TodoApp.controller('TodosCtrl', function ($scope, todos) {
  'use strict';
  $scope.todos = todos;
});
