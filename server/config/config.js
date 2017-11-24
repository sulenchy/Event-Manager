require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {

    // use_env_variable: 'DATABASE_URL',
    host: process.env.DATABASE_HOST_PROD,
    database: process.env.DATABASE_DATABASE_PROD,
    user: process.env.DATABASE_USER_PROD,
    password: process.env.DATABASE_PASSWORD_PROD,
  },
};
