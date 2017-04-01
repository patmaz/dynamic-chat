var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV:', env);

var entry = [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client/index.js'
   ];

var devServer = {
      contentBase: "./public",
      hot: true
   };

var plugins = [
   new HtmlWebpackPlugin({
      template: 'client/chat.html',
      filename: 'chat.html',
      inject: 'body',
   })
];

process.env.BABEL_ENV = 'development';

if (env === 'production') {
   plugins.push(
        new UglifyJSPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new webpack.DefinePlugin({
           'process.env': {
               'NODE_ENV': JSON.stringify('production')
           }
        })
   );
   entry = './client/index.js';
   devServer = {};
   process.env.BABEL_ENV = 'production'
}

var config = {
   entry: entry,

   output: {
      filename: './bundle.js',
      path: __dirname + '/public',
   },

   devServer: devServer,

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
            }, {
                loader: 'postcss-loader'
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