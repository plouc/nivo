import type { GatsbyConfig } from 'gatsby'

// 1. custom env var
// 2. netlify deployment
// 3. main site
const siteUrl = process.env.SITE_URL || process.env.DEPLOY_URL || 'https://nivo.rocks' // no trailing slash

const config: GatsbyConfig = {
    siteMetadata: {
        title: `nivo`,
        description: `Supercharged React dataviz components.`,
        siteUrl,
        og: {
            siteName: 'nivo',
            twitterCreator: '@benitteraphael',
        },
    },
    // More easily incorporate content into your pages through
    // automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        'gatsby-plugin-pnpm',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'assets',
                path: './src/assets',
            },
        },
        'gatsby-plugin-image',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'nivo',
                short_name: 'nivo',
                start_url: `/`,
                background_color: '#333333',
                theme_color: '#333333',
                display: 'minimal-ui',
                icon: `src/assets/icons/nivo-icon.png`, // This path is relative to the root of the site.
            },
        },
    ],
}

export default config
