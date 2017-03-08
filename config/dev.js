const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')

/**
 * Webpack devlopment config
 *
 * @returns {Object} - devlopment configuration
 */
module.exports = function dev() {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    devServer: {
      stats: 'minimal',
      publicPath: '/dist/',
    },
  })
}
