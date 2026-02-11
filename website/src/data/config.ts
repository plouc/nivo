export default {
    // local
    // nivoApiUrl: 'http://localhost:3030/nivo',
    // storybookUrl: 'http://localhost:6006/',

    // production (override at build time via Gatsby env vars)
    // Note: keep these base URLs WITHOUT a trailing slash.
    nivoApiUrl: process.env.GATSBY_NIVO_API_URL || 'https://nivo-api.herokuapp.com/nivo',
    // Default to the self-hosted storybook served from this same origin.
    storybookUrl: process.env.GATSBY_STORYBOOK_URL || '/storybook/',
}
