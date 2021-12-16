module.exports = {
    presets: [
        ['@babel/preset-env', { loose: true }],
        ['@babel/preset-react', {
            development: process.env.BABEL_ENV === "development",
            runtime: 'automatic'
        }],
        '@babel/preset-typescript',
    ],
}
