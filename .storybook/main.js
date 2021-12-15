module.exports = {
    stories: ['../packages/*/stories/*.stories.@(js|tsx)'],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-storysource',
    ],
    framework: '@storybook/react'
}