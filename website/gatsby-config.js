/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
module.exports = {
  siteMetadata: {
    title: `nivo`,
    description: `Supercharged React dataviz components, built on top of d3js.`,
    author: `Raphaël Benitte`,
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
    `gatsby-plugin-offline`,
  ],
}
