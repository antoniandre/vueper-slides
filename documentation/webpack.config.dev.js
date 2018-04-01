const webpack = require('webpack')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const { ifDevelopment, ifProduction } = getIfUtils(nodeEnv)
const src = './src'
const publicPath = '/vueper-slides/documentation/'

module.exports = removeEmpty({
  entry: src + '/index.js',

  output: {
    filename: ifProduction('[name]-bundle-[hash].js', '[name]-bundle.js'),
    publicPath: publicPath
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },

  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.pug$/, exclude: /node_modules/, use: ['html-loader', 'pug-html-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory' },
      { test: /\.s(a|c)ss$/, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpe?g|gif|ico)$/, use: ['file-loader?name=images/[name].[hash:8].[ext]'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  },

  devtool: ifDevelopment('eval-source-map', 'source-map'),

  devServer: ifDevelopment({
    host: '0.0.0.0',
    port: 5555,
    openPage: publicPath.substr(1),
    contentBase: publicPath,
    historyApiFallback: true,
    hot: true
  }),

  plugins: removeEmpty([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),

    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: src + '/index.html',
      environment: nodeEnv
    }),

    new CopyWebpackPlugin([src + '/assets']),

    ifProduction(
      new ExtractTextPlugin('[name]-bundle-[hash].css'),
      new ExtractTextPlugin('[name]-bundle.css')
    )
  ])
})
