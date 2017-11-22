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
        assert.equal(res.body.status, 'Error signing up');
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
        assert.deepEqual(res.body.status, 'Sign-in Error');
        assert.deepEqual(res.body.message, 'User not found. Sign-in with correct data or signup as a new client');
        assert.deepEqual(res.status, 400);
        done();
      });
  });

});

