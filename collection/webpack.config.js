var webpack = require('webpack');

module.exports = {
  context: __dirname + '/app',
  entry: './app.js',
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ],
  },
  externals: {
    $: 'jquery',
    jQuery: 'jquery',
    '_': 'underscore',
    'Backbone': 'Backbone'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
}