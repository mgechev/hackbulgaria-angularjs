# Lightweight AngularJS implementation

In this exercise we are going to create a lightweight implementation of AngularJS.

Our framework is going to support directives, two-way data-binding, services, controllers...and even more!

## Scope

0. Define a constructor function called `Scope`. It should initialize the properties:
  * `$$watchers` - an empty array
  * `$$children` - an empty array
  * `$parent` - it should accept the value of a parameter called `parent` passed to the constructor function.
  * `$id` - it should accept the value of a parameter called `id` passed to the constructor function or `0` if the passed parameter is `undefined`.
  * `Scope` should have "static" property called `counter`, with initial value `
0. Define method called `$eval`. It should **evaluate expressions in the context of the current scope**. The expressions, which would be evaluated should be:
  * Method invocation (i.e. `foo()`)
  * Function invocation, i.e. the value of the expression passed to `$eval` will ne a function, which will be invoked in the context of the scope.
  * Get property value (i.e. `bar`).

0. Add method called `$watch` to the prototype of the `Scope` function. It should accept two arguments `exp` and `fn`. It should add new object to the `$$watchers` array. The properties of the new object should be called `exp`, `fn` and `last`. The first two properties should accept the values of the arguments passed to `$watch`, `last` should be set to be equals to **cloned** (`Utils.clone`) value of the value result from evaluation of the expression (`exp`).

0. Add method called `$new` - a factory method for creating new scopes. The created scope should inherit prototypically from `this` and its `$id` should be equals to `Scope.counter + 1`. Add the created scope to the `$$children` array and return it.

0. Define method called `$destroy`. It should remove the current scope from the `$$children` array of its parent.

0. Define method called `$digest`. Inside the body of the method a loop should iterate over given statements until all watchers are "clean" (i.e. their current value is equals to their last value - `Utils.equals`). In the end of the method invocation it should be called recursively for all children of the method.


## Provider

0. Create object literal called `Provider`. The provider object should has the following public methods:
  * `get` - used for getting directives
  * `directive` - used for defining directives
  * `controller` - used for defining controllers
  * `service` - used for defining services
  * `annotate` - used for getting array of the names of the dependencies of given "provider" (i.e. service, controller or directive).
  * `invoke` - used for invoking services (i.e. resolving their dependencies and calling the factory method).
  * `Provider` should have a "static" properties called `DIRECTIVES_SUFFIX` and `CONTROLLERS_SUFFIX` with values "Directive" and "Controller".

0. Define property of type object, which is called `_providers`

0. Define a property called `_cache`. It should contains a property with value `new Scope`.

0. Define a method called `annotate`, which accepts a function and returns an array of its arguments names.

0. Define a method called `get`. It should accept arguments called `name` (name of the provider) and `locals` (local dependencies). `get` should return the service if it is already cached (i.e. property of `this._cache`), otherwise it should call its factory method with the method `this.invoke` and cache the result. Do not forget to pass the local dependencies to `this.invoke`.

0. Define method called `invoke`. It should accept two arguments - `fn` (factory method) and `locals` (local dependnecies). Using `annotate` and `get` resolve all dependencies of the current factory method (`fn`) and invoke the factory method in any context.

0. Add method called `_register`. `_register` should accept two arguments - `fn` (factory method of the provider) and `name` (name of the provider). It should add new property of the `_providers` hash map with name the first argument passed to the method and value a function, which returns the factory method of the proider.

0. Add methods called `directive`, `controller` and `service`. They should accept two arguments - `name` (name of the provider) and `fn` (factory method). They should call `_register` with appropriate name for the provider (i.e. with special suffix for `directive` and `controller` - `DIRECTIVES_SUFFIX`, `CONTROLLERS_SUFFIX`) and the factory method, which is passed as second argument.
