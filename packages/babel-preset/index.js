'use strict'

module.exports = () => {
    const presets = [
        [
            `@babel/env`,
            {}
        ],
        [
            `@babel/react`,
            {}
        ]
    ]

    const plugins = [
        `@babel/proposal-class-properties`,
        [
            `lodash`,
            {
                id: ['lodash', 'recompose']
            }
        ]
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
        plugins.push.apply(plugins, [require.resolve('./use-lodash-es')])
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

    return {
        presets,
        plugins
    }
}
