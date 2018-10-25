import React from 'react'
import Helmet from 'react-helmet'

const ChartMeta = ({ location, package: pkg, component }) => {
    const imageFileName = location.pathname
        .replace(/^\//g, '')
        .replace(/\/$/g, '')
        .replace(/\//g, '_')

    let image = require(`../static/screenshots/${imageFileName}.png`)
    if (image.indexOf('http') !== 0) {
        image = `http://nivo-v2.surge.sh${image}`
    }

    const title = `nivo dataviz library: ${component} chart`

    const meta = [
        // facebook
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: location.href },
        { property: 'og:image', content: image },
        { property: 'og:title', content: title },
        // { property: 'og:description', content: metaDescription },

        // twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image:src', content: image },
        { name: 'twitter:title', content: title },
        // { name: 'twitter:description', content: metaDescription }
    ]

    return <Helmet meta={meta} />
}

export default ChartMeta
