var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /(\.css)$/,
        use: [{ loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "postcss-loader" }]
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: "awesome-typescript-loader" },],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use:[{loader: 'url-loader'}]
      }
    ]
  }
};
