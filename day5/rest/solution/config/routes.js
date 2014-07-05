module.exports = function (app) {
  var todo = require('../app/controllers/todo');
  app.get('/todos/:id', todo.todo);
  app.get('/todos', todo.list);
  app.post('/todos', todo.add);
  app.delete('/todos/:id', todo.delete);
};
