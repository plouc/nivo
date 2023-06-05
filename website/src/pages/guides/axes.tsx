import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import PageContent from '../../components/PageContent'
import { AxesPosition, AxesTicks, AxesLegend } from '../../components/guides/axes'
import { DescriptionBlock } from '../../components/styled'

const AxesGuide = () => {
    return (
        <Layout>
            <Seo title="Axes Guide" description="Using chart axes in nivo components." />
            <PageContent>
                <div className="guide__header">
                    <h1>Axes</h1>
                </div>
            </PageContent>
            <DescriptionBlock>
                <h2>Using axes in nivo components</h2>
                <p>
                    Axes are built on top of{' '}
                    <a
                        href="https://github.com/d3/d3-scale"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        d3 scales
                    </a>
                    . A lot of nivo components make use of it (<Link to="/bar/">Bar</Link>,{' '}
                    <Link to="/line/">Line</Link>, <Link to="/scatterplot/">ScatterPlot</Link>
                    …).
                </p>
            </DescriptionBlock>
            <AxesPosition />
            <AxesTicks />
            <AxesLegend />
        </Layout>
    )
}

export default AxesGuide
