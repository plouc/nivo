// 1. custom env var
// 2. netlify deployment
// 3. main site
const siteUrl = process.env.SITE_URL || process.env.DEPLOY_URL || 'https://nivo.rocks' // no trailing slash

module.exports = {
    siteMetadata: {
        title: `nivo`,
        description: `Supercharged React dataviz components.`,
        siteUrl,
        og: {
            siteName: 'nivo',
            twitterCreator: '@benitteraphael',
        },
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/src/assets`,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {},
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `nivo`,
                short_name: `nivo`,
                start_url: `/`,
                background_color: `#3c91e8`,
                theme_color: `#3c91e8`,
                display: `minimal-ui`,
                icon: `src/assets/icons/nivo-icon.png`, // This path is relative to the root of the site.
            },
        },
    ],
}
