const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')

/**
 * Webpack prodcution config
 *
 * @returns {Object} - prodcution configuration
 */
module.exports = function prod() {
  return webpackMerge(commonConfig(), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
          warnings: false,
        },
      }),
    ],
  })
}
