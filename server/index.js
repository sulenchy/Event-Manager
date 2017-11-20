import Sequelize from 'sequelize';
import test from './test';


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
