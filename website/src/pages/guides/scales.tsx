import React from 'react'
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import PageContent from '../../components/PageContent'
import { ScaleLinear } from '../../components/guides/scales/ScaleLinear'
import { ScaleBand } from '../../components/guides/scales/ScaleBand'
import { DescriptionBlock } from '../../components/styled'

const ScalesGuide = () => {
    return (
        <Layout>
            <Seo
                title="Scales Guide"
                description="Map an input “domain” of data values to an output “range” of visual values."
            />
            <PageContent>
                <div className="guide__header">
                    <h1>Scales</h1>
                </div>
            </PageContent>
            <DescriptionBlock>
                <h2>Using scales in nivo components</h2>
                <p>
                    D3 scales are functions that map from an input “domain” of data values to an
                    output “range” of visual values (typically pixel positions, lengths, colors,
                    etc.). They form a core part of D3’s data-driven approach, enabling you to
                    translate raw data into on-screen representations in a declarative way. They're
                    used extensively in nivo components.
                </p>
            </DescriptionBlock>
            <ScaleLinear />
            <ScaleBand />
        </Layout>
    )
}

export default ScalesGuide
