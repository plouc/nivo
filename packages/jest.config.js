const path = require('path')

module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    verbose: true,
    testEnvironment: 'jsdom',
    setupFiles: [path.resolve(path.join(__dirname, 'jest.setup.js'))],
}