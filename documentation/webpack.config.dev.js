const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const src = path.join(__dirname, 'src')
const dist = path.join(__dirname, 'dist')

module.exports = {
  entry: {
    vendor: ['vue', 'vuetify', 'vue-router'],
    app: src + '/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: dist,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist,
    host: 'vueperslides.test',
    historyApiFallback: true,
    hot: true
  },

  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.pug$/, use: ['html-loader', 'pug-html-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // Extract SCSS / CSS.
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            // 'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            // 'postcss-loader',// Used for auto vendor-prefixing - not needed on dev.
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg#.*)$/,
        use: { loader: 'file-loader', options: { name: '[name].[ext]' } }
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico|pdf)$/,
        use: { loader: 'file-loader', options: { name: '[name].[ext]' } }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: src + '/assets/images/favicon.png',
      filename: 'index.html',
      template: src + '/index.html'
    }),

    // Extract all css into a proper file.
    new ExtractTextPlugin('[name].css'),

    //Extract vendor CSS/JS
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
