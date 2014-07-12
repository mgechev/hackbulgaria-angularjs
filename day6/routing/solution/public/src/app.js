/* global window, angular */

(function () {
  'use strict';
  window.TodoApp = angular.module('todo', ['ngRoute']);
  TodoApp.config(function ($routeProvider) {
    $routeProvider.when('/todo/:id', {
      templateUrl: 'partials/todo.html',
      controller: 'TodoCtrl',
      resolve: {
        todo: function (Todo, $route) {
          return Todo.get(parseInt($route.current.params.id));
        }
      }
    })
    .when('/todos', {
      templateUrl: 'partials/todos.html',
      controller: 'TodosCtrl',
      resolve: {
        todos: function (Todo) {
          return Todo.getList();
        }
      }
    })
    .otherwise({ redirectTo: '/todos' });
  });
}());

