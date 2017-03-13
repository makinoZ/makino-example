'use strict';

var path = require('path')
var glob = require('glob')
var core = require('./webpack.core.js')
var buildExtra = require('./webpack.build-extra.js')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname)
var SRC_PATH = path.resolve(ROOT_PATH, 'src')
var PAGE_PATH = path.resolve(SRC_PATH, 'pages')
var DIST_PATH = path.resolve(ROOT_PATH, 'dist')

// var entry = require('./entry.config.js')
// var plugins = require('./html.webpack.plugin.config.js').plugins

// 获取入口文件
let entries = (() => {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  let map = {}

  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })

  return map
})()


entries['vue'] = ['vue','vue-resource','vue-router']

// 生成html列表
let htmlPlugin = (() => {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []

  entryHtml.forEach((filePath) => {
      let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      let conf = {
          template: filePath,
          filename: filename + '.html',
          chunks: ['vue', filename],
          inject: 'body'
      }

      arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
})()

module.exports = {
  entry: entries,
  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: 'js/[name].js',
    library: '[name]'
  },
  plugins: [
    // new ExtractTextPlugin('css/[name].css')
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true, 
      disable: false
    }),
  ].concat(htmlPlugin,core.plugins),

  module: core.module,
  resolve: {
      alias: Object.assign({}, core.resolve.alias, {
      components: path.resolve(SRC_PATH, 'components'),
      pages: path.resolve(SRC_PATH, 'pages'),
      css: path.resolve(SRC_PATH, 'modules/css'),
      js: path.resolve(SRC_PATH, 'modules/js'),
      mock:path.resolve(SRC_PATH, 'modules/mock'),
      sass: path.resolve(SRC_PATH, 'modules/sass'),
      icon: path.resolve(SRC_PATH, 'modules/icon'),
      imgs: path.resolve(SRC_PATH, 'modules/imgs')
    })
  },
  devServer: core.devServer,
  devtool: core.devtool
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = buildExtra.devtool
    // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat(buildExtra.plugins)
}
