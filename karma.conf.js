var webpack = require('webpack');
var path    = require('path');


/**
 * Heavily inspired by react-router setup (https://github.com/reactjs/react-router/blob/master/karma.conf.js)
 */
module.exports = function (config) {
    var customLaunchers = {
        // The ancient Travis Chrome that most projects use in CI.
        ChromeCi: {
            base:  'Chrome',
            flags: [ '--no-sandbox' ]
        }
    };

    var isCi        = process.env.CONTINUOUS_INTEGRATION === 'true';
    var runCoverage = false; //process.env.COVERAGE === 'true' || isCi;

    var coverageLoaders   = [];
    var coverageReporters = [];

    if (runCoverage) {
        coverageLoaders.push({
            test:    /\.js$/,
            include: path.resolve('src/'),
            exclude: /__tests__/,
            loader:  'isparta'
        });

        coverageReporters.push('coverage');
    }

    config.set({
        customLaunchers: customLaunchers,

        browsers:   ['Chrome'],
        frameworks: ['mocha'],
        reporters:  ['mocha'].concat(coverageReporters),

        singleRun:  true,

        autoWatch:           true,
        autoWatchBatchDelay: 1000,

        files: [
            'specs/**/*.spec.js'
        ],

        preprocessors: {
            'specs/**/*.spec.js': [ 'webpack', 'sourcemap' ]
        },

        webpack: {
            devtool: 'inline-source-map',
            module:  {
                loaders: [
                    {
                        test:    /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel'
                    }
                ].concat(coverageLoaders)
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('test')
                })
            ]
        },

        webpackServer: {
            noInfo: true
        },

        coverageReporter: {
            reporters: [
                { type: 'html',     subdir: 'html' },
                { type: 'lcovonly', subdir: '.'    }
            ]
        }
    });

    if (process.env.TRAVIS) {
        config.browsers = ['ChromeCi'];
    }
};
