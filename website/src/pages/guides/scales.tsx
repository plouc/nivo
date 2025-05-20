import React from 'react'
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import PageContent from '../../components/PageContent'
// import { FloatingMiniToc } from '../../components/nav/FloatingMiniToc'
import { ScaleLinear, ScaleBand, ScaleLog, ScaleSymlog } from '../../components/guides/scales'
import { DescriptionBlock } from '../../components/styled'

const ScalesGuide = () => {
    return (
        <>
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
                    <h2 id="whats-a-scale">
                        <a href="#whats-a-scale">What's a scale?</a>
                    </h2>
                    <p>
                        D3 scales are functions that map from an input “domain” of data values to an
                        output “range” of visual values (typically pixel positions, lengths, colors,
                        etc.). They form a core part of D3’s data-driven approach, enabling you to
                        translate raw data into on-screen representations in a declarative way.
                        They're used extensively in nivo components.
                    </p>
                    <p>
                        You'll often encounter scale controls in the interactive documentation. But
                        because scales heavily depend on the shape of the data, which is pre-defined
                        in these docs, you might not be able to try-out all available scale types
                        directly there.
                    </p>
                </DescriptionBlock>
                <ScaleLinear />
                <ScaleBand />
                <ScaleLog />
                <ScaleSymlog />
            </Layout>
            {/*
            <FloatingMiniToc
                title="Scales"
                items={[
                    {
                        label: "What's a scale?",
                        anchor: 'whats-a-scale',
                    },
                    {
                        label: 'Linear scale',
                        anchor: 'linear-scale',
                    },
                    {
                        label: 'Band scale',
                        anchor: 'band-scale',
                    },
                    {
                        label: 'Symlog scale',
                        anchor: 'symlog-scale',
                    },
                ]}
            />
            */}
        </>
    )
}

export default ScalesGuide
