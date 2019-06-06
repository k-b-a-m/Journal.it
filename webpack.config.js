const config = require('./config.js');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './client',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { GOOGLE_API_KEY: JSON.stringify(config.GOOGLE_API_KEY) },
    }),
  ],
};
