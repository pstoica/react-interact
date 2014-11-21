var webpack = require('webpack');

module.exports = {
  entry: './modules/index',
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx?harmony' }
    ]
  },
  output: {
    filename: 'dist/react-interact.min.js',
    libraryTarget: 'umd',
    library: 'ReactDND'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};