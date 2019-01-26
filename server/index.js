// import dependencies
import express from 'express';
import logger from 'morgan';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import validator from 'express-validator';
import webpackConfig from '../webpack.config.dev';
import routes from './routes/routes';

const app = express();


const isDevelopment = process.env.NODE_ENV === 'development';

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
}));


// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(validator());

app.use(routes);


// log request to the console
app.use(logger('dev'));

// Application port
const port = process.env.PORT || 5005;

// logs transaction to the terminal
logger('dev');

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// will print stacktrace if not production
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.statusMessage || 'failure',
    errors: {
      message: err.message,
    }
  });
  if (isDevelopment) {
    next(err);
  }
});

// starts server
export default app.listen(port);
