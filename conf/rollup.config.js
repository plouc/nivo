import { camelCase, upperFirst } from 'lodash'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import stripBanner from 'rollup-plugin-strip-banner'
import cleanup from 'rollup-plugin-cleanup'

const pkg = process.env.PACKAGE
const isWatching = process.env.ROLLUP_WATCH === 'TRUE'

const externals = [
    'prop-types',
]

const mapGlobal = name => {
    if (name.indexOf('@nivo') === 0) return 'nivo'
    if (name.indexOf('d3-') === 0) return 'd3'
    if (name.indexOf('recompose') === 0) return upperFirst(camelCase(name))
    if (name === 'react') return 'React'
    if (name === 'prop-types') return 'PropTypes'
    if (name === 'react-motion') return 'ReactMotion'
    return name
}

const common = {
    input: `./packages/${pkg}/src/index.js`,
    external: id => externals.includes(id)
        || id.indexOf('react') === 0
        || id.indexOf('d3') === 0
        || id.indexOf('@nivo') === 0
        || id.indexOf('lodash') === 0
        || id.indexOf('recompose') === 0,
}

const commonPlugins = [
    stripBanner({
        include: `./packages/${pkg}/src/**/*.js`,
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
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        presets: ['react-app']
    }),
    cleanup()
]

const configs = [
    {
        ...common,
        output: {
            file: `./packages/${pkg}/dist/nivo-${pkg}.es.js`,
            format: 'es',
            name: `@nivo/${pkg}`,
            sourcemap: true,
        },
        plugins: commonPlugins,
    }
]

if (!isWatching) {
    configs.push({
        ...common,
        output: {
            file: `./packages/${pkg}/dist/nivo-${pkg}.cjs.js`,
            format: 'cjs',
            name: `@nivo/${pkg}`,
            sourcemap: true,
        },
        plugins: commonPlugins,
    })
    configs.push({
        ...common,
        output: {
            file: `./packages/${pkg}/dist/nivo-${pkg}.umd.js`,
            format: 'umd',
            extend: true,
            name: 'nivo',
            globals: mapGlobal,
            sourcemap: true,
        },
        plugins: commonPlugins,
    })
}

export default configs