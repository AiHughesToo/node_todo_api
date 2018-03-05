//const MongoClient = require('mongodb').MongoClient;
// es6 destructuring version of the above line.
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('error message: unable to connect to DB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').insertOne({
	// 	  text: 'Something to do',
	// 	  completed: false
	//   }, (err, result) =>{
	//     if (err) {
	// 	  return console.log('Unable to insert record', err);
	//     }
	// 	  console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	db.collection('Users').insertOne({
		  name: 'Alex Hughes',
		  age: 44,
			location: 'Lost'
	  }, (err, result) =>{
	    if (err) {
		  return console.log('Unable to insert record', err);
	    }
		  console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	});

	db.close();

});
