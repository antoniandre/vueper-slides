const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const src = path.join(__dirname, 'src')
const dist = path.join(__dirname, '../docs')

module.exports = {
  entry: {
    app: src + '/index.js',
    vendor: ['vue', 'vuetify', 'vue-router', 'vueperslides']
  },
  output: {
    filename: '[name].[hash:8].min.js', // Hash is different on each build, allows smart caching/flushing of file.
    path: dist,
  },
  devtool: 'source-map',

  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.pug$/, use: ['html-loader', 'pug-html-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // Extract and minify SCSS / CSS.
      {
        test: /\.scss$/,
        include: src,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true, sourceMap: true } },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true, sourceMap: true } },
            'postcss-loader'
          ]
        })
      },
      { test: /\.(woff2?|eot|ttf|otf|svg#.*)$/, loader: 'file-loader' },
      { test: /\.(png|svg|jpe?g|gif|ico|pdf)$/, loader: 'file-loader' }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(dist),
    new HtmlWebpackPlugin({
      favicon: src + '/assets/images/favicon.png',
      filename: 'index.html',
      template: src + '/index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    // Extract all css into a proper file.
    new ExtractTextPlugin('[name].css'),

    //Extract vendor CSS/JS
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min.js',
      minChunks: Infinity
    }),

    // Deduplicate modules into a common bundle.
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }), // Specify the common bundle's name.

    new UglifyJSPlugin({ sourceMap: true }),

    // Allow the use of environment variables. E.g:
    // if (process.env.NODE_ENV !== 'production') {console.log('dev mode!')}
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],

  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  }
}
