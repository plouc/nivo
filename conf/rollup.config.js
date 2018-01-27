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
        'd3-ease',
        'd3-time',
        'd3-time-format',
        'd3-color',
        'd3-hierarchy',
        'd3-interpolate',
        'd3-scale-chromatic',
        'd3-sankey',
        'react-measure',
        'react-motion',
        'react',
        'prop-types',
        'lodash',
        'lodash/without',
        'lodash/isPlainObject',
        'lodash/pick',
        'lodash/cloneDeep',
        'lodash/min',
        'lodash/max',
        'lodash.range',
        'lodash.random',
        'lodash.shuffle',
        'uniq',
        'recompose/setDisplayName',
        'recompose/defaultProps',
        'recompose/withState',
        'recompose/shouldUpdate',
        'recompose/compose',
        'recompose/withPropsOnChange',
        'recompose/withStateHandlers',
        'recompose/setPropTypes',
        'recompose/withProps',
        'recompose/withHandlers',
        'recompose/pure',
        'react-motion',
    ],
    plugins: [
        stripBanner({
            include: `./packages/nivo-${pkg}/src/**/*.js`,
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