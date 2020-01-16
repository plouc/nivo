import { camelCase, upperFirst } from 'lodash'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import stripBanner from 'rollup-plugin-strip-banner'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'

// required while migrating packages to TypeScript
const typescriptPackages = ['axes', 'colors', 'core', 'radar', 'scales', 'tooltip']

const externals = ['prop-types']

const pkg = process.env.PACKAGE
const isWatching = process.env.ROLLUP_WATCH === 'TRUE'
const isTypescript = typescriptPackages.includes(pkg)

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
    input: `./packages/${pkg}/src/index.${isTypescript ? 'ts' : 'js'}`,
    external: id =>
        externals.includes(id) ||
        id.indexOf('react') === 0 ||
        id.indexOf('d3') === 0 ||
        id.indexOf('@nivo') === 0 ||
        id.indexOf('lodash') === 0 ||
        id.indexOf('recompose') === 0,
}

const commonPlugins = [
    stripBanner({
        include: `./packages/${pkg}/src/**/*.{js,ts,tsx}`,
    }),
    // this must be defined before the typescript plugin,
    // see https://github.com/ezolenko/rollup-plugin-typescript2/issues/66
    resolve({
        mainFields: ['module', 'jsnext', 'main', 'browser'],
        extensions: ['.js', '.ts', '.tsx'],
        modulesOnly: true,
    }),
    isTypescript &&
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                include: [`./packages/${pkg}/src`],
                compilerOptions: {
                    baseUrl: `./packages/${pkg}`,
                    declaration: true,
                    declarationDir: `./packages/${pkg}/dist`,
                },
            },
        }),
    babel({
        exclude: 'node_modules/**',
        externalHelpers: true,
        presets: ['@nivo/babel-preset'],
        // make sure typescript files are processed,
        // see https://github.com/ezolenko/rollup-plugin-typescript2/issues/108
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    cleanup(),
].filter(plugin => !!plugin)

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
    },
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
