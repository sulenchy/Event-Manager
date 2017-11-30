// import dependencies
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../webpack.config.dev';
import routes from './routes/routes';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
}));

app.use(routes);


// log request to the console
app.use(logger('dev'));

dotenv.config();

// Application port
const port = process.env.PORT || 5005;


// logs transaction to the terminal
logger('dev');


// starts server
export default app.listen(port);
