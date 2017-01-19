const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
          'specs.webpack.js'
        ],

        preprocessors: {
            'specs.webpack.js' : ['webpack']
        },

        webpack: webpackConfig,

        /** Hide webpack build information from output */
        webpackMiddleware: {
          noInfo: 'errors-only'
        },
        browsers: ['Chrome']
    })
}
