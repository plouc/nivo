import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SeoProps {
    title: string
    description?: string
    lang?: string
    meta?: object[]
    keywords?: string[]
}

export const Seo = ({
    title,
    description = '',
    lang = 'en',
    meta = [],
    keywords = [],
}: SeoProps) => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                ...meta,
            ].concat(
                keywords.length > 0
                    ? {
                          name: `keywords`,
                          content: keywords.join(`, `),
                      }
                    : []
            )}
        />
    )
}
