module.exports = function (app) {
  var todo = require('../app/controllers/todo');
  app.get('/todo/:id', todo.todo);
  app.get('/todo', todo.list);
  app.post('/todo', todo.save);
  app.post('/todo/:id', todo.update);
  app.delete('/todo/:id', todo.delete);
};
