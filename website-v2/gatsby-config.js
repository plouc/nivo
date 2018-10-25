module.exports = {
    siteMetadata: {
        title: 'nivo',
    },
    plugins: [
        'gatsby-transformer-yaml',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'data',
                path: `${__dirname}/src/data/`,
            }
        },
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-remark',
        'gatsby-plugin-catch-links',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-sass',
    ],
}
