const path = require('path')

module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFiles: [path.resolve(path.join(__dirname, 'jest.setup.js'))],
    transformIgnorePatterns: ['node_modules/(?!(d3-color)/)'],
}
