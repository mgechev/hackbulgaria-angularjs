/* global TodoApp */

TodoApp.directive('todoForm', function () {
  return {
    templateUrl: 'src/directives/todoForm.html',
    restrict: 'E',
    scope: {
      todo: '=',
      save: '&'
    },
    link: function (scope) {
      scope.todo.until = new Date(scope.todo.until);
      scope.saveData = function () {
        scope.todo.until = scope.todoDate + '/' + scope.todoTime;
        scope.save(scope.todo);
      };
    }
  };
});
