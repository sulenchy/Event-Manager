import chai from 'chai';
import request from 'supertest';
import app from './index';

const assert = chai.assert;

const users = [

];

const events = [

];

const centers = [

];

describe('Andevents API endpoint Test', () => {

});

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

