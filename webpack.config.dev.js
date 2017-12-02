import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
   path.resolve(__dirname, './client/index.js'),
  ],
  output: {
    path: `${__dirname  }client/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader'],
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader'],
        include: __dirname,
      },
    ],
  },
};
