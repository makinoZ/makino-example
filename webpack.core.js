var path = require('path')
var webpack = require('webpack')
var ROOT_PATH = path.resolve(__dirname)
var JS_PATH = path.resolve(ROOT_PATH, 'modules/js')
var SERVICE_PATH = path.resolve(JS_PATH, 'service')

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    rules: [

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              loader: ['css-loader', 'postcss-loader'],
              fallbackLoader: 'vue-style-loader'
            }),
            sass: ExtractTextPlugin.extract({
              loader: ['css-loader', 'sass-loader', 'postcss-loader'],
              fallbackLoader: 'vue-style-loader'
            })
          }
        }
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          "presets": [
            ["es2015", { "modules": false }]
          ]
        },
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]?[hash]'
        }
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },

      {
        test: /\.html$/,
        loader: 'html-loader'
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'file-loader',
        options: {
          name: 'video/[name].[ext]?[hash]'
        }
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader'],
          fallbackLoader: 'style-loader'
        })
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallbackLoader: 'style-loader'
        })
      }

    ]
  },
  plugins: [

    //全局挂载，js里可直接使用
    new webpack.ProvidePlugin({
      Vue: 'vue',
      VueResource: 'vue-resource',
      VueRouter: 'vue-router'
    }),

  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min',
      commonJS: JS_PATH,
      service: SERVICE_PATH
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}
