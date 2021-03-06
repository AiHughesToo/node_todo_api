
//library imports
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// Set up the app
var app = express();
// heroku port variable
const port = process.env.PORT || 3000;

//middleware. this somehow tells the app to parse the body of the request
//into json for use later in the app.
app.use(bodyParser.json());

// this works like a combo of routes file and the controller in Rails
// I would expect this to be refactored into routes and a controller file.
app.post('/todos', (req, res) => {
  // make a new isntance of a todo this is a create method
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

// get todos

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// show method
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) { return res.status(404).send(); }

  Todo.findById(id)
  .then((todo) => {
                   if(!todo){ return res.status(404).send('Todo not found with that id.'); }
                   res.send({todo});
                  }).catch((e) => {
                      res.status(400).send();
                     });
});

//starting the server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
