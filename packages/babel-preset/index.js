/*
 * A lot of this directly comes from:
 * https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/create.js
 */
'use strict'

module.exports = (api, opts) => {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV
    const isEnvDevelopment = env === 'development'
    const isEnvProduction = env === 'production'
    const isEnvTest = env === 'test'

    // console.log('isEnvDevelopment:', isEnvDevelopment)
    // console.log('isEnvProduction:', isEnvProduction)
    // console.log('isEnvTest:', isEnvTest)

    const presets = [
        isEnvTest && [
            // ES features necessary for user's Node version
            require('@babel/preset-env').default,
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        (isEnvProduction || isEnvDevelopment) && [
            // Latest stable ECMAScript features
            require('@babel/preset-env').default,
            {
                // We want Create React App to be IE 9 compatible until React itself
                // no longer works with IE 9
                targets: {
                    ie: 9,
                },
                // Users cannot override this behavior because this Babel
                // configuration is highly tuned for ES5 support
                ignoreBrowserslistConfig: true,
                // If users import all core-js they're probably not concerned with
                // bundle size. We shouldn't rely on magic to try and shrink it.
                useBuiltIns: false,
                // Do not transform modules to CJS
                modules: false,
                // Exclude transforms that make all code slower
                exclude: ['transform-typeof-symbol'],
            },
        ],
        [
            require('@babel/preset-react').default,
            {
                // Adds component stack to warning messages
                // Adds __self attribute to JSX which React will use for some warnings
                development: isEnvDevelopment || isEnvTest,
                // Will use the native built-in instead of trying to polyfill
                // behavior for any plugins that require one.
                useBuiltIns: true,
            },
        ],
    ].filter(Boolean)

    const plugins = [
        // Necessary to include regardless of the environment because
        // in practice some other transforms (such as object-rest-spread)
        // don't work without it: https://github.com/babel/babel/issues/7215
        require('@babel/plugin-transform-destructuring').default,
        // class { handleClick = () => { } }
        // Enable loose mode to use assignment instead of defineProperty
        // See discussion in https://github.com/facebook/create-react-app/issues/4263
        [
            require('@babel/plugin-proposal-class-properties').default,
            {
                loose: true,
            },
        ],
        // The following two plugins use Object.assign directly, instead of Babel's
        // extends helper. Note that this assumes `Object.assign` is available.
        // { ...todo, completed: true }
        [
            require('@babel/plugin-proposal-object-rest-spread').default,
            {
                useBuiltIns: true,
            },
        ],
        // Polyfills the runtime needed for async/await, generators, and friends
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime
        /*
        [
            require('@babel/plugin-transform-runtime').default,
            {
                corejs: false,
                helpers: areHelpersEnabled,
                regenerator: true,
                // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
                // We should turn this on once the lowest version of Node LTS
                // supports ES Modules.
                useESModules,
                // Undocumented option that lets us encapsulate our runtime, ensuring
                // the correct version is used
                // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
                absoluteRuntime: absoluteRuntimePath,
            },
        ],
        */
        isEnvProduction && [
            // Remove PropTypes from production build
            require('babel-plugin-transform-react-remove-prop-types').default,
            {
                removeImport: false,
            },
        ],
    ].filter(Boolean)

    if (env === 'commonjs') {
        /*
        plugins.push.apply(plugins, [
            [
                require.resolve('@babel/plugin-transform-modules-commonjs'),
                {
                    loose: true,
                },
            ],
        ])
        */
    }

    if (env === 'test') {
        plugins.push.apply(plugins, [
            //require.resolve('babel-plugin-istanbul'),
            [
                require('@babel/plugin-transform-modules-commonjs').default,
                {
                    loose: true,
                },
            ],
        ])
    }

    return {
        presets,
        plugins,
    }
}
