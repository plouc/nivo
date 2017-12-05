'use strict'

const plugins = [
    [
        require.resolve('babel-plugin-transform-es2015-template-literals'),
        {
            loose: true,
        },
    ],
    require.resolve('babel-plugin-transform-es2015-literals'),
    require.resolve('babel-plugin-transform-es2015-function-name'),
    require.resolve('babel-plugin-transform-es2015-arrow-functions'),
    require.resolve('babel-plugin-transform-es2015-block-scoped-functions'),
    require.resolve('babel-plugin-transform-class-properties'),
    [
        require.resolve('babel-plugin-transform-es2015-classes'),
        {
            loose: true,
        },
    ],
    require.resolve('babel-plugin-transform-es2015-object-super'),
    require.resolve('babel-plugin-transform-es2015-shorthand-properties'),
    [
        require.resolve('babel-plugin-transform-es2015-computed-properties'),
        {
            loose: true,
        },
    ],
    require.resolve('babel-plugin-check-es2015-constants'),
    [
        require.resolve('babel-plugin-transform-es2015-spread'),
        {
            loose: true,
        },
    ],
    require.resolve('babel-plugin-transform-es2015-parameters'),
    [
        require.resolve('babel-plugin-transform-es2015-destructuring'),
        {
            loose: true,
        },
    ],
    require.resolve('babel-plugin-transform-es2015-block-scoping'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-react-jsx'),
    require.resolve('babel-plugin-syntax-jsx'),
]

const env = process.env.BABEL_ENV || process.env.NODE_ENV

if (env === 'commonjs') {
    plugins.push.apply(plugins, [
        [
            require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
            {
                loose: true,
            },
        ],
    ])
}

if (env === 'es') {
    plugins.push.apply(plugins, [require.resolve('./build/use-lodash-es')])
}

if (env === 'test') {
    plugins.push.apply(plugins, [
        require.resolve('babel-plugin-istanbul'),
        [
            require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
            {
                loose: true,
            },
        ],
    ])
}

module.exports = {
    plugins,
}
