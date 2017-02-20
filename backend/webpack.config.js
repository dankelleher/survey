const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/surveyHandlers.js',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: __dirname,
      exclude: [/node_modules/, "test"]
    }]
  }
};