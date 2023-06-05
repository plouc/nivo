const path = require('path')

const config = {
    verbose: true,
    testEnvironment: 'jest-environment-jsdom',
    reporters: [['default', { summaryThreshold: 3 }]],
    setupFiles: [path.resolve(path.join(__dirname, 'jest.setup.js'))],
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!d3)/"
    ],
}

module.exports = config
