var mongoose = require("mongoose");

// connect to the database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = { mongoose };
