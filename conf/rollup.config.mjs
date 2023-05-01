import fs from 'fs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import stripBanner from 'rollup-plugin-strip-banner'
import cleanup from 'rollup-plugin-cleanup'
import size from 'rollup-plugin-size'
import { visualizer } from 'rollup-plugin-visualizer'
import terser from "@rollup/plugin-terser"

const pkg = process.env.PACKAGE
const isWatching = process.env.ROLLUP_WATCH === 'true'

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
const babelConfig = {
    extensions,
    exclude: /node_modules/,
    babelHelpers: 'bundled',
    comments: false,
}

const externals = [
    'prop-types',
    'joi',
]

let input = `./packages/${pkg}/src/index.js`

// detect TS entry index file
if (fs.existsSync(`./packages/${pkg}/src/index.ts`)) {
    input = `./packages/${pkg}/src/index.ts`
}

const common = {
    input,
    external: id => externals.includes(id)
        || id.indexOf('react') === 0
        || id.indexOf('d3') === 0
        || id.indexOf('@nivo') === 0
        || id.indexOf('lodash') === 0
        || id.indexOf('@react-spring') === 0,
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
        extensions,
        modulesOnly: true,
    }),
    babel(babelConfig),
    !isWatching && terser(),
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
        plugins: [
            ...commonPlugins,
            !isWatching && size({
                filename: `stats/${pkg}-size.es.json`,
            }),
            !isWatching && visualizer({
                filename: `stats/${pkg}-stats.es.json`,
                json: true,
            })
        ].filter(Boolean),
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
}

export default configs
