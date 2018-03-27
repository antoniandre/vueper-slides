const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const srcDir = path.join(__dirname, 'src')
const distDir = __dirname

module.exports = {
  // context: srcDir,
  entry: {
    'app': srcDir + '/index.js'
  },
  output: {
    filename: '[name].js',
    path: distDir
    // To use with express server.
    // publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 5555,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      'static'
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [
      srcDir,
      'node_modules'
    ],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.pug$/, exclude: /node_modules/, use: ['html-loader', 'pug-html-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpe?g|gif|ico)$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  }
}
