import { memo } from 'react'
// import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
// import config from '../data/config'

/*
const config = {
    storybookUrl: 'https://nivo.rocks/storybook',
    nivoApiUrl: 'https://nivo.rocks/api',
}

const link = ({ href, children }: { href: string; children: ReactNode }) => {
    // if (href.indexOf('self:') === 0) {
    //     return <Link to={href.replace('self:', '')}>{children}</Link>
    // }

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
*/

// <ReactMarkdown transformLinkUri={u => u} components={customComponents as any}>
export const Markdown = memo(({ source }: { source: string }) => (
    <ReactMarkdown>{source}</ReactMarkdown>
))
