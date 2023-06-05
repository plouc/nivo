import React from 'react'
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import PageContent from '../../components/PageContent'
import ColorsIllustrations from '../../components/guides/colors/ColorsIllustrations'
import ColorsRanges from '../../components/guides/colors/ColorsRanges'
import ColorsColor from '../../components/guides/colors/ColorsColor'
import { DescriptionBlock } from '../../components/styled'

const Colors = () => (
    <Layout>
        <Seo
            title="Colors Guide"
            description="Using colors in nivo, color schemes, color scales…"
        />
        <PageContent>
            <div className="guide__header">
                <h1>Colors</h1>
            </div>
        </PageContent>
        <DescriptionBlock>
            <h2>The colors property</h2>
            <p>
                Beside highlighting data insights, your dataviz should be pretty, right?
                <br />
                nivo provides an easy way to deal with colors, very useful when using nested
                components.
            </p>
        </DescriptionBlock>
        <ColorsIllustrations />
        <DescriptionBlock>
            <h2>Available color schemes</h2>
            <p>
                Almost all color schemes come from{' '}
                <a
                    href="https://github.com/d3/d3-scale-chromatic"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    d3-scale-chromatic
                </a>
                .
            </p>
        </DescriptionBlock>
        <ColorsRanges />
        <ColorsColor />
    </Layout>
)

export default Colors
