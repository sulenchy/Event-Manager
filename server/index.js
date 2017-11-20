// import dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import test from './test';

const app = express(); // Application is Initialised

// log request to the console
app.use(logger('dev'));

// Application port
const port = process.env.PORT || 5005;

// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

/* Event Manager Endpoint */
app.get('/api/v1/home', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome to Andevents API Endpoint!',
  });
});

test('Production is still working');
console.log(process.env.SECRET_MESSAGE);

// const sequelize = new Sequelize(process.env.DATABASE_URL);

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

logger('dev');
console.log('we are live on port', port);
// Start server on port 5000
export default app.listen(port);
