import babel from 'rollup-plugin-babel'
import stripBanner from 'rollup-plugin-strip-banner'

export default {
    input: './src/index.js',
    output: {
        file: 'cjs/nivo-line.js',
        format: 'cjs'
    },
    name: 'nivo-line',
    external: [
        'react',
        'prop-types',
        'recompose/compose',
        'recompose/defaultProps',
        'recompose/withPropsOnChange',
        'recompose/pure',
        'recompose/setDisplayName',
        'd3-shape',
        '@nivo/core',
        '@nivo/scales',
        '@nivo/axes',
        '@nivo/legends',
        'react-motion',
    ],
    plugins: [
        stripBanner({
            include: './src/**/*.js',
        }),
        babel({
            plugins: ['external-helpers']
        }),
    ]
}