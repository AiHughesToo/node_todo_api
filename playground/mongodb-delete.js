//const MongoClient = require('mongodb').MongoClient;
// es6 destructuring version of the above line.
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('error message: unable to connect to DB server');
	}
	console.log('Connected to MongoDB server');
  // delete many
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });


  db.collection('Todos').findOneAndDelete({
    _id: new ObjectID("5a9da49e013732f39f69ce1e")
  }).then((results) => {
 	console.log(JSON.stringify(results, undefined, 2));
  });
	// db.close();

});
