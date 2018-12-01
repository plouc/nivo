if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/nivo-axes.production.min.js')
} else {
    module.exports = require('./cjs/nivo-axes.development.js')
}
