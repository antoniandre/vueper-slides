const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
    // Also a good practice to separate third-party libs into a vendor chunk
    // (less likely to change than local source code).
    // vendor: [
    //     'lodash'
    // ]
  },
  output: {
    filename: '[name].[hash].js', // Hash is different on each build, allows smart caching/flushing of file.
    path: path.resolve(__dirname, 'dist')
    // To use with express server.
    // publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 5555,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      'static'
    ]),
    new UglifyJSPlugin({ sourceMap: true }),

    // Allow to do sth like:
    // if (process.env.NODE_ENV !== 'production') {console.log('dev mode!')}
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),

    // Deduplicate modules.
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }) // Specify the common bundle's name.
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
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
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  }
}
