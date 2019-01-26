import { assert } from 'chai';
import request from 'supertest';
import app from '.';
import { Users, Events, Centers } from './models';

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

Events.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

Centers.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

let token;
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEwMTMyODA5LCJleHAiOjE1MTAxNDM2MDl9.Kjyo44x-yMFaS4yO9rr0kzi2qxQ1NxIod7HS5IMUihc';

/** testing the home endpoint */
describe('GET "/api/v1/home", to test server ', () => {
  it('should respond with a 200 status code, status, and message', (done) => {
    request(app)
      .get('/api/v1/home')
      .end((err, res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Welcome to Andevents API Endpoint!');
        assert.deepEqual(res.status, 200);
        done();
      });
  });
});

/* Test for the signup endpoint */
describe('Signup with "/api/v1/users/signup"', () => {
  it('should return password length error', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'tester',
        email: 'tester@test.com',
        password: 'man',
        userType: 'admin',
        retypePassword: 'man',
      })
      .expect(400)
      .then((res) => {
        assert.equal(res.body.status, 'Error signing up');
        assert.deepEqual(res.body.message, 'Password must not be less than 8 characters');
        assert.deepEqual(res.status, 400);
        done();
      })
      .catch(err => done(err.message));
  });
  it('Should successfully signup user', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'tester',
        email: 'tester@test.com',
        password: 'idreskunn',
        retypePassword: 'idreskunn',
        userType: 'admin',
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Account created successfully');
        assert.deepEqual(res.body.user.username, 'tester');
        assert.deepEqual(res.body.user.id, 1);
        assert.deepEqual(res.status, 201);
        done();
      })
      .catch(err => done(err.message));
  });
  it('Should successfully signup user', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'client',
        email: 'client@test.com',
        password: 'client12345',
        retypePassword: 'client12345',
        userType: 'client',
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Account created successfully');
        assert.deepEqual(res.body.user.username, 'client');
        assert.deepEqual(res.body.user.id, 2);
        assert.deepEqual(res.status, 201);
        done();
      })
      .catch(err => done(err.message));
  });
  it('should return "user already exists" error', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'tester',
        email: 'tester@test.com',
        password: 'idreskunn',
        retypePassword: 'idreskunn',
        userType: 'admin',
      })
      .expect(400)
      .then((res) => {
        assert.equal(res.body.status, 'Error signing up');
        assert.deepEqual(res.body.message, 'This username is already taken, enter a new username');
        assert.deepEqual(res.status, 400);
        done();
      })
      .catch(err => done(err.message));
  });
});

/* Test for the signin endpoint */
describe('Signin with "/api/v1/users/signin"', () => {
  it('should return signin error with empty fields', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'tester@test.com',
        password: '',
      })
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Error signing in');
        assert.deepEqual(res.body.message, 'Sorry, email or password cannot be empty');
        done();
      });
  });
  it('should return "User not found info"', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'test',
        password: 'tester',
      })
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Error signing in');
        assert.deepEqual(res.body.message, 'Sorry, user not found ...');
        assert.deepEqual(res.status, 400);
        done();
      });
  });
  it('should return signin "Signin Error" error for wrong password', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'tester@test.com',
        password: 'isdskunkun',
      })
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Error signing in');
        assert.deepEqual(res.body.message, 'Sorry, email or password is incorrect');
        assert.deepEqual(res.status, 400);
        done();
      });
  });
  it('should return signin 200 "Success" status with token', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'client@test.com',
        password: 'client12345',
      })
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Congratulation, you successfully signed-in into andevents');
        assert.deepEqual(res.status, 200);
        token = res.body.token;
        done();
      });
  });
});

/* Test for the center related endpoints */
describe('GET, POST and PUT Centers', () => {
  /* TEST for GET and POST centers */
  it('should return an error if no center', (done) => {
    request(app)
      .get('/api/v1/centers')
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Empty list found');
        assert.deepEqual(res.body.message, 'Sorry, No center is available');
        assert.lengthOf(res.body.centers, 0);
        done();
      })
      .catch(err => done(err));
  });
  it('should return "Unauthorised" when token not supplied', (done) => {
    request(app)
      .post('/api/v1/centers')
      .send({
        name: 'wedding',
        address: 'Andela EPIC Tower',
        capacity: 1000,
        facilities: 'Generator, AC etc',
        image: 'andevent.jpg',
        cost: 1000000,
      })
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Authentication failed');
        assert.deepEqual(res.body.message, 'Please send your token along with your request');
        assert.deepEqual(res.status, 403);
        done();
      })
      .catch(err => done(err));
  });
  it('should return 403 status code for expired token', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', expiredToken)
      .send({
        name: 'wedding',
        address: 'Andela EPIC Tower',
        capacity: 1000,
        facilities: 'Generator, AC etc',
        image: 'andevent.jpg',
        cost: 1000000,
      })
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Authentication failed');
        assert.deepEqual(res.body.message, 'Please, signin again to get a token.');
        assert.deepEqual(res.status, 403);
        done();
      })
      .catch(err => done(err));
  });
  it('should add a center', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', token)
      .send({
        name: 'wedding',
        address: 'Andela EPIC Tower',
        capacity: 1000,
        facilities: 'Generator, AC etc',
        image: 'andevent.jpg',
        cost: 1000000,
      })
      .expect(401)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Error accessing the resource');
        assert.deepEqual(res.body.message, 'Sorry, you do not have the required priviledge to the resource');
        assert.deepEqual(res.status, 401);
        done();
      })
      .catch(err => done(err));
  });
  it('should return signin 200 "Success" status with token', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'tester@test.com',
        password: 'idreskunn',
      })
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Congratulation, you successfully signed-in into andevents');
        assert.deepEqual(res.status, 200);
        token = res.body.token;
        done();
      });
  });
  it('should add a center', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', token)
      .send({
        name: 'wedding',
        address: 'Andela EPIC Tower',
        capacity: 1000,
        facilities: 'Generator, AC etc',
        image: 'andevent.jpg',
        cost: 1000000,
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center added successfully');
        assert.deepEqual(res.status, 201);
        done();
      })
      .catch(err => done(err.message));
  });
  it('should return an error if no center', (done) => {
    request(app)
      .get('/api/v1/centers')
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'List of Centers');
        assert.lengthOf(res.body.centers, 1);
        done();
      })
      .catch(err => done(err));
  });
});
