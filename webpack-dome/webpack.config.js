var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/script/main.js',
    a: './src/script/a.js',
    b: './src/script/a.js',
    c: './src/script/a.js',
  },
  output: {
    filename: 'js/[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://cdn.com',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'a.html',
      inject: false,
      title: 'webpack is a.html',
      excludeChunks:['b', 'c'],
    }),
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'b.html',
      inject: false,
      title: 'webpack is b.html',
      excludeChunks:['a','c'],
    }),
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'c.html',
      inject: false,
      title: 'webpack is c.html',
      excludeChunks:['a','b'],
    }),
  ]
};
