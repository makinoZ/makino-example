var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  // devtool: '#source-map',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vue'],
      minChunks: Infinity
    }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ]
}
