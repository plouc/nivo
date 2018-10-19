module.exports = {
    siteMetadata: {
        title: 'nivo',
    },
    plugins: [
        'gatsby-transformer-yaml',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data/`,
            }
        },
        `gatsby-transformer-remark`,
        'gatsby-plugin-sass',
    ],
}
