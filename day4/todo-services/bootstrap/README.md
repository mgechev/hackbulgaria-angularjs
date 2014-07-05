# Todo App

## index.html

1. Add appropriate directives to the `body` element in order to bootstrap the application and associate the `TodoCtrl` to it.
2. Add appropriate data binding directive to the input element `input[name="title-input"]`. to property called `todoTitle`.
3. Add appropriate expression in `ng-click` directive to the button element in order to add new todo items in the `TodoCtrl`. The expression should invoke method called `add` attached to the scope in the `TodoCtrl`.
4. Iterate over all todo items using the appropriate directive and print the title of each directive inside the content of `li` item.
5. Add appropriate directive to the delete button for each todo item. The directive should invoke the `remove` method attached to the scope, with argument the current `todo`item.
