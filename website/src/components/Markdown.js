import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import config from '../data/config'

const link = ({ href, children }) => {
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
        <a href={uri} rel="noopener noreferrer">
            {children}
        </a>
    )
}

const customComponents = { a: link }

const Markdown = memo(({ source }) => {
    return (
        <ReactMarkdown transformLinkUri={u => u} components={customComponents}>
            {source}
        </ReactMarkdown>
    )
})

Markdown.displayName = 'Markdown'
Markdown.propTypes = {
    source: PropTypes.string.isRequired,
}

export default Markdown
