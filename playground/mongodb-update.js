//const MongoClient = require('mongodb').MongoClient;
// es6 destructuring version of the above line.
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('error message: unable to connect to DB server');
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos').findOneAndUpdate({
																					_id: new ObjectID("5a9da474013732f39f69ce14")
																				  }, {
																					$set: {
																						completed: true
																					}
																					}, {
																						returnOriginal: false
																					}).then((result) => {
																						console.log(result);
																					});

	// db.close();

});
