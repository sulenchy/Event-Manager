import { assert } from 'chai';
import request from 'supertest';
import app from './index';
import { Users, Events, Centers } from './models';
// const assert = chai.assert;

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
        assert.equal(res.body.status, 'Password error');
        assert.deepEqual(res.body.message, 'Password must not be less than 8 or be undefined');
        assert.deepEqual(res.status, 400);
        done();
      })
      .catch(err => done(err));
  });
  it('Should successfully signup user', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'tester',
        email: 'tester@test.com',
        password: 'idreskunn',
        userType: 'admin',
        retypePassword: 'idreskunn',
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Account created successfully');
        assert.deepEqual(res.body.username, 'tester');
        assert.deepEqual(res.body.id, 1);
        assert.deepEqual(res.status, 201);
        done();
      })
      .catch(err => done(err));
  });
  it('Should successfully signup user', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'client',
        email: 'client@test.com',
        password: 'client12345',
        userType: 'client',
        retypePassword: 'client12345',
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Account created successfully');
        assert.deepEqual(res.body.username, 'client');
        assert.deepEqual(res.body.id, 2);
        assert.deepEqual(res.status, 201);
        done();
      })
      .catch(err => done(err));
  });
  it('should return "user already exists" error', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'tester',
        email: 'tester@test.com',
        password: 'idreskunn',
        userType: 'admin',
        retypePassword: 'idreskunn',
      })
      .expect(400)
      .then((res) => {
        console.log(res.body.message);
        assert.equal(res.body.status, 'Operation undefined Error signing up');
        assert.deepEqual(res.body.message, 'This username already exist or invalid data supplied');
        assert.deepEqual(res.status, 400);
        done();
      })
      .catch(err => done(err));
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
        assert.deepEqual(res.body.status, 'Sign-in Error');
        assert.deepEqual(res.body.message, 'Please enter your email and password');
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
        assert.deepEqual(res.body.status, 'Sign-in Error');
        assert.deepEqual(res.body.message, 'User not found. Sign-in with correct data or signup as a new client');
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
        console.log(res.body);
        assert.deepEqual(res.body.status, 'Login Error');
        assert.deepEqual(res.body.message, 'Incorrect login details supplied');
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
        console.log(res.body);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Congratulation, you successfully signed-in into andevents');
        assert.deepEqual(res.status, 200);
        token = res.body.data;
        console.log(res.body);
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
        assert.deepEqual(res.body.message, 'Sorry, No center is available.');
        assert.lengthOf(res.body.data, 0);
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
        console.log(res.body, res.status);
        assert.deepEqual(res.body.status, 'Fail');
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
        assert.deepEqual(res.body.status, 'Fail');
        assert.deepEqual(res.body.message, 'Authentication Failed, Please signin again to get a token.');
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
        assert.deepEqual(res.body.status, 'Authority Error');
        assert.deepEqual(res.body.message, 'Sorry, you do not have the required previledge to the resource');
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
        console.log(res.body);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Congratulation, you successfully signed-in into andevents');
        assert.deepEqual(res.status, 200);
        token = res.body.data;
        console.log('the token', token);
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
      .catch(err => done(err));
  });
});
