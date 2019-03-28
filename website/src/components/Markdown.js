/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import config from '../data/config'

const linkRenderer = ({ href, children }) => {
    if (href.indexOf('self:') === 0) {
        return <Link to={href.replace('self:', '')}>{children}</Link>
    }

    let uri = href
    if (uri.indexOf('storybook:') === 0) {
        uri = uri.replace('storybook:', `${config.storybookUrl}?path=/story/`)
    }
    if (uri.indexOf('api:') === 0) {
        uri = uri.replace('api:', `${config.nivoApiUrl}`)
    }

    return (
        <a href={uri} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    )
}

const Markdown = memo(({ source }) => {
    return (
        <ReactMarkdown
            source={source}
            transformLinkUri={u => u}
            renderers={{
                link: linkRenderer,
            }}
        />
    )
})

Markdown.displayName = 'Markdown'
Markdown.propTypes = {
    source: PropTypes.string.isRequired,
}

export default Markdown
