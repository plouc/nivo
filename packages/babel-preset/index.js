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
        // it seems we have nothing specifig to do here
        // but it's kept as a reminder that config
        // can be overridden for 'test' env.
    }

    return {
        presets,
        plugins
    }
}
