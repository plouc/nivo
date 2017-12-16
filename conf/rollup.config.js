import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import stripBanner from 'rollup-plugin-strip-banner'

const pkg = process.env.PACKAGE

export default {
    input: `./packages/nivo-${pkg}/src/index.js`,
    output: {
        file: `./packages/nivo-${pkg}/cjs/nivo-${pkg}.js`,
        format: 'cjs'
    },
    name: '@nivo/axes',
    external: [
        '@nivo/axes',
        '@nivo/core',
        '@nivo/legends',
        '@nivo/scales',
        'd3-chord',
        'd3-format',
        'd3-scale',
        'd3-shape',
        'd3-voronoi',
        'react',
        'prop-types',
        'lodash',
        'lodash/without',
        'lodash/isPlainObject',
        'lodash/pick',
        'lodash/cloneDeep',
        'recompose/setDisplayName',
        'recompose/defaultProps',
        'recompose/withState',
        'recompose/shouldUpdate',
        'recompose/compose',
        'recompose/withPropsOnChange',
        'recompose/withStateHandlers',
        'recompose/setPropTypes',
        'recompose/withProps',
        'recompose/pure',
        'react-motion',
    ],
    plugins: [
        stripBanner({
            include: './src/**/*.js',
        }),
        resolve({
            module: true,
            jsnext: true,
            main: true,
            browser: true,
            extensions: ['.js'],
            modulesOnly: true,
        }),
        babel({
            plugins: ['external-helpers']
        }),
    ]
}