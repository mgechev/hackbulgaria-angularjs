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
      scope.saveData = function () {
        scope.todo.until = scope.todoDate + '/' + scope.todoTime;
        scope.save(scope.todo);
      };
    }
  };
});
