/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-webpack5-compiler-swc',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {},
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
}
export default config
