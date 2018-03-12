
//library imports
var express = require('express');
var bodyParser = require('body-parser');
//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// Set up the app
var app = express();

//middleware
app.use(bodyParser.json());

// this works like a combo of routes file and the controller in Rails
app.post('/todos', (req, res) => {
  // make a new isntance of a todo
  var todo = new Todo ({
    text: req.body.text
  });
  // save the the record and respond to the user.
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//starting the server
app.listen(3000, () => {
  console.log('Started on port 3000');
});
