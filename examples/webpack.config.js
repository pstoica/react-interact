var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './index',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolveLoader: {
    modulesDirectories: ['..', 'node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['jsx?harmony'] },
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^react-interact$/,
      path.join(__dirname, '../src/index')
    )
  ]
};