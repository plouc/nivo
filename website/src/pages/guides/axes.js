import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import PageContent from '../../components/PageContent'
import AxesPosition from '../../components/guides/axes/AxesPosition'
import AxesTicks from '../../components/guides/axes/AxesTicks'
import AxesLegend from '../../components/guides/axes/AxesLegend'
import { DescriptionBlock } from '../../components/styled'

export default class Axes extends Component {
    render() {
        return (
            <Layout>
                <Seo title="Axes Guide" />
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
                        . A lot of nivo components make use of it (<Link to="/bar">Bar</Link>,{' '}
                        <Link to="/line">Line</Link>, <Link to="/scatterplot">ScatterPlot</Link>
                        …).
                    </p>
                </DescriptionBlock>
                <AxesPosition />
                <AxesTicks />
                <AxesLegend />
            </Layout>
        )
    }
}
