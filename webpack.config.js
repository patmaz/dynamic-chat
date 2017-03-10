var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV:', env);

entry = [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client/index.js'
   ]

var plugins = [
   new HtmlWebpackPlugin({
      template: 'client/index.html',
      filename: 'index.html',
      inject: 'body',
   })
];

process.env.BABEL_ENV = 'development';

if (env === 'production') {
   plugins.push(
      new UglifyJSPlugin(),
      new OptimizeJsPlugin({
         sourceMap: false
      })
   );
   entry = './client/index.js';
   process.env.BABEL_ENV = 'production'
}

var config = {
   entry: entry,

   output: {
      filename: './bundle.js',
      path: __dirname + '/public',
   },

   module: {
      loaders: [
         {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         },
         {
            test: /\.scss$/,
            use: [{
                  loader: "style-loader"
            }, {
                  loader: "css-loader",
                  options: {
                     modules: true
                  }
            }, {
                  loader: 'sass-loader'
            }]
         }
      ]
   },
   plugins: plugins,
   node: {
      fs: "empty"
   }
}

module.exports = config;