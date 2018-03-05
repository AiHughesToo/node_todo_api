//const MongoClient = require('mongodb').MongoClient;
// es6 destructuring version of the above line.
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('error message: unable to connect to DB server');
	}
	console.log('Connected to MongoDB server');
	// equivilant to rails:
  // def index
	// # @todos = Todos.all
	// @todos = Todos.where(completed: false)
	// render json: @todos
	// end

	// db.collection('Todos').find({completed: false}).toArray().then ((docs) => {
	//   db.collection('Todos').find({
	// 		_id: new ObjectID('5a9d8b46bc0aa1149a71ab6a')
	// 	}).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Undable to fetch todos', err);
	// });

// rails version
// def index
// @todos = Todo.find
// p @todos.size
// end
	db.collection('Todos').find().toArray().then((count) => {
	console.log(`Todos count: ${count}` );
}, (err) => {
	console.log('Undable to fetch todos', err);
});
	// db.close();

});
