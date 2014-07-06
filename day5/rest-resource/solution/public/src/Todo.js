/* global TodoApp */

TodoApp.factory('Todo', function ($resource) {
  'use strict';
  return $resource('/todo/:id');
});
