const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const src = path.join(__dirname, 'src')
const dist = path.join(__dirname, 'dist')

module.exports = {
  entry: src + '/index.js',
  output: {
    filename: '[name].[hash:8].js', // Hash is different on each build, allows smart caching/flushing of file.
    path: dist
    // To use with express server.
    // publicPath: './'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: dist,
    host: '0.0.0.0',
    port: 5555,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin([dist]),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: src + '/index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    // new CopyWebpackPlugin([src + '/assets']),
    new UglifyJSPlugin({ sourceMap: true }),

    // Allow the use of environment variables. E.g:
    // if (process.env.NODE_ENV !== 'production') {console.log('dev mode!')}
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),

    // Deduplicate modules.
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }) // Specify the common bundle's name.
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
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
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: { name: 'images/[name].[hash:8].[ext]', publicPath: './dist' }
        }
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  }
}
