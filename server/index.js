// import dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import { UserSignup, UserSignin } from './controllers/users';
import { AddNewCenter, GetCenterList } from './controllers/centers';
import { AddNewEvent } from './controllers/events';
import auth from './auth/auth';

const app = express(); // Application is Initialised

// log request to the console
app.use(logger('dev'));

// Application port
const port = process.env.PORT || 5005;

// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

// testing babel
// test('Production is still working');
console.log(process.env.SECRET_MESSAGE);

// testing the database connection  starts here
// const sequelize = new Sequelize(process.env.DATABASE_URL);

// const sequelize = new Sequelize(
//   process.env.DB_NAME, process.env.DB_USERNAME,
//   process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   },
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// testing database connection stops here

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


/**
 * Centers endpoints requiring authentication before getting access
 *to different points of the application
 */
app.use(auth.verifyUser);
app.post('/api/v1/centers', AddNewCenter.addNew);
app.post('/api/v1/events', AddNewEvent.addNew);

logger('dev');
console.log('we are live on port', port);
// Start server on port 5000
export default app.listen(port);
