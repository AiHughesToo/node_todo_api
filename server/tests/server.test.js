const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
//seed file
const todos = [{_id: new ObjectID(),text: 'First test todo'},{_id: new ObjectID(),text: 'second test todo'}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app).post('/todos').send({text})
                .expect(200).expect((res) => {
                  expect(res.body.text).toBe(text);
                }).end((err, res) => {
                  if (err) {
                    return done(err);
                  }
                  Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                  }).catch((e) => done(e));
                });
  });
// setup the test and define what it should do.
  it('should not create todo with invalid data', (done) => {
// send the request to the endpoint
    request(app).post('/todos').send({}).expect(400).end((err, res) => {
      // handle the inital error and return so nothing else runs
      if (err) { return done(err); }
      // check the database if the record was created
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

// new test for get request
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app).get('/todos').expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });
  // testing not found
  it('should return a 404', (done) => {
    var badId = new ObjectID();
    request(app).get(`/todos/${badId.toHexString()}`)
    .expect(404)
    .end(done);
  });
  // test for invalad id.
  it('should return a 404', (done) => {
    var badId2 = new ObjectID().toHexString() + 'abc';
    request(app).get(`/todos/${badId2}`)
    .expect(404)
    .end(done);
  });
});
