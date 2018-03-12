var mongoose = require('mongoose');

// connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
   type: Boolean
  },
  completedAt: {
   type: Number
  }
});
