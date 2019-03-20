module.exports = ({ config }) => {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                // Temp fix for issue: https://github.com/storybooks/storybook/issues/3346
                ...config.module.rules.map(rule => {
                    if (rule.use && rule.use.length) {
                        const isBabelLoader = rule.use.some(({ loader }) => loader === 'babel-loader')
                        if (isBabelLoader) {
                            return {
                                ...rule,
                                use: rule.use.map(use => {
                                    if (use.loader === 'babel-loader') {
                                        return {
                                            ...use,
                                            options: {
                                                ...use.options,
                                                babelrc: false,
                                            }
                                        }
                                    }

                                    return use
                                }),
                                exclude: [
                                    ...rule.exclude,
                                    /\/packages\/.*\/cjs\//
                                ]
                            }
                        }
                    }

                    return rule
                }),
                {
                    test: /\.stories\.jsx?$/,
                    loaders: [require.resolve('@storybook/addon-storysource/loader')],
                    enforce: 'pre',
                }
            ]
        }
    }
}