import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { IGatsbyImageData, getSrc } from 'gatsby-plugin-image'
// @ts-ignore
import { useLocation } from '@gatsbyjs/reach-router'

interface Meta {
    name: string
    content: string
}

interface SeoProps {
    title: string
    description?: string
    image?: IGatsbyImageData
    lang?: string
    meta?: Meta[]
    keywords?: string[]
}

interface SiteData {
    site: {
        siteMetadata: {
            title: string
            description: string
            siteUrl: string
            og: {
                siteName: string
                twitterCreator: string
            }
        }
    }
}

export const Seo = ({
    title: _title,
    description: _description,
    image,
    lang = 'en',
    keywords,
}: SeoProps) => {
    const location = useLocation()

    const { site } = useStaticQuery<SiteData>(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        title
                        description
                        siteUrl
                        og {
                            siteName
                            twitterCreator
                        }
                    }
                }
            }
        `
    )

    const title = _title || site.siteMetadata.title
    const description = _description || site.siteMetadata.description

    const metas: Meta[] = [
        // TITLE
        {
            name: 'og:title',
            content: title,
        },
        {
            name: 'twitter:title',
            content: title,
        },
        // DESCRIPTION
        {
            name: 'description',
            content: description,
        },
        {
            name: 'og:description',
            content: description,
        },
        {
            name: 'twitter:description',
            content: description,
        },
        // OTHERS
        {
            name: 'og:type',
            content: 'website',
        },
        {
            name: 'og:site_name',
            content: site.siteMetadata.og.siteName,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:creator',
            content: site.siteMetadata.og.twitterCreator,
        },
        {
            name: 'og:url',
            content: `${site.siteMetadata.siteUrl}${location.pathname}`,
        },
    ]

    if (keywords) {
        metas.push({
            name: `keywords`,
            content: keywords.join(`, `),
        })
    }

    if (image) {
        metas.push({
            name: 'og:image:width',
            content: `${image.width}`,
        })
        metas.push({
            name: 'og:image:height',
            content: `${image.height}`,
        })

        const imageSrc = `${site.siteMetadata.siteUrl}${getSrc(image)!}`
        metas.push({
            name: 'og:image:secure_url',
            content: imageSrc,
        })
        metas.push({
            name: 'twitter:image',
            content: imageSrc,
        })
    }

    return (
        <Helmet titleTemplate={`%s | ${site.siteMetadata.title}`}>
            <html lang={lang} />
            <meta charSet="utf-8" />
            <title>{title}</title>
            {metas.map(meta => (
                <meta key={meta.name} name={meta.name} content={meta.content} />
            ))}
        </Helmet>
    )
}
