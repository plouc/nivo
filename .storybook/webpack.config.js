module.exports = (baseConfig, env, defaultConfig) => ({
    ...defaultConfig,
    module: {
      ...defaultConfig.module,
      rules: [
        // Temp fix for issue: https://github.com/storybooks/storybook/issues/4066 and https://github.com/storybooks/storybook/issues/3346
        ...defaultConfig.module.rules.filter(rule => !(
          (rule.loader && rule.loader.includes(require.resolve('svg-url-loader')))
          || (rule.use && rule.use.length && rule.use.find(({ loader }) => loader === 'babel-loader'))
        )),
        {
            test: /\.jsx?$/,
            include: require('path').resolve('./'), // eslint-disable-line global-require
            exclude: /(node_modules|dist)/,
            loader: 'babel-loader',
          },
      ],
    },
  });