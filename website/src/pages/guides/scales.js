/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { themeContext } from '@nivo/core'
import { useTheme } from '../../theming/context'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import PageContent from '../../components/PageContent'
import ScaleLinear from '../../components/guides/scales/ScaleLinear'
import ScaleTime from '../../components/guides/scales/ScaleTime'
import { DescriptionBlock } from '../../components/styled'

const Scales = () => {
    const theme = useTheme()

    return (
        <Layout>
            <themeContext.Provider value={theme.nivo}>
                <SEO title="Scales Guide" />
                <PageContent>
                    <div className="guide__header">
                        <h1>Scales</h1>
                    </div>
                </PageContent>
                <DescriptionBlock>
                    <p>
                        nivo uses D3 under the hood, and encoding abstract data to visual
                        representation is mostly done by using scales, if you want further
                        information about it, you could have a look at{' '}
                        <a
                            href="https://github.com/d3/d3-scale"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the official D3 documentation
                        </a>
                        .
                    </p>
                </DescriptionBlock>
                <ScaleLinear />
                <ScaleTime />
            </themeContext.Provider>
        </Layout>
    )
}

export default Scales
