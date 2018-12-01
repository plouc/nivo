if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/nivo-bar.production.min.js')
} else {
    module.exports = require('./cjs/nivo-bar.development.js')
}
