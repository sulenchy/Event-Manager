// import dependencies
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { UserSignup, UserSignin } from './controllers/users';
import { AddNewCenter, GetCenterList, GetCenterWithEvent } from './controllers/centers';
import { AddNewEvent, UpdateEvent, DeleteEvent } from './controllers/events';
import auth from './auth/auth';

const app = express(); // Application is Initialised

// log request to the console
app.use(logger('dev'));

dotenv.config();
// Application port
const port = process.env.PORT || 5005;

// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

// testing babel
// test('Production is still working');
console.log(process.env.SECRET_MESSAGE);

/* Event Manager Endpoint */
app.get('/api/v1/home', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome to Andevents API Endpoint!',
  });
});

/* Signin and Signup API Endpoint */
app.post('/api/v1/users/signup', UserSignup.signUp);
app.post('/api/v1/users/signin', UserSignin.signIn);
app.get('/api/v1/centers', GetCenterList.listAll);

// authenticate the secure endpoint
app.use(auth.verifyUser);

/**
 * Centers endpoints requiring authentication before getting access
 *to different points of the application
 */

app.post('/api/v1/centers', AddNewCenter.addNew);
app.get('/api/v1/centers/:id', GetCenterWithEvent.getCenter);

/**
 * Events endpoints requiring authentication before getting access
 *to different points of the application
 */
app.post('/api/v1/events', AddNewEvent.addNew);
app.put('/api/v1/events/:id', UpdateEvent.updateEvent);
app.delete('/api/v1/events/:id', DeleteEvent.deleteEvent);
// logs transaction to the terminal
logger('dev');

// logs a string message about what port we are using to the terminal
console.log('we are live on port', port);

// starts server
export default app.listen(port);
