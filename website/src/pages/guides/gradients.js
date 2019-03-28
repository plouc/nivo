/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import PageContent from '../../components/PageContent'
import GradientsIllustrations from '../../components/guides/gradients/GradientsIllustrations'
import GradientsExample from '../../components/guides/gradients/GradientsExample'
import { DescriptionBlock } from '../../components/styled'

export default class Gradients extends Component {
    render() {
        return (
            <Layout>
                <SEO title="Gradients Guide" />
                <PageContent>
                    <div className="guide__header">
                        <h1>Gradients</h1>
                    </div>
                </PageContent>
                <DescriptionBlock>
                    <p>
                        While gradients rarely add meaning to your data, it's an easy way to enhance
                        the look of your charts.
                    </p>
                    <h2>Using gradients in nivo</h2>
                    <p>
                        Defining gradients in nivo is a <strong>2 steps process</strong>, first
                        you'll have to declare available definitions (the same goes for{' '}
                        <Link to="/guides/patterns">patterns</Link>) using dedicated helpers or
                        providing plain objects.
                        <br />
                        Then you must define the rules to apply those definitions using the{' '}
                        <code>fill</code> property.
                    </p>
                </DescriptionBlock>
                <GradientsIllustrations />
                <DescriptionBlock>
                    <p>
                        <strong>Separating gradient definitions from application</strong> allows us
                        to reuse those in various places, like fills and borders, and while
                        maintaining a direct mapping for a bar chart with 5 items can be simple
                        enough, when you're dealing with a complex heatmap with tens of nodes it can
                        quickly become cumbersome. Doing so also provides the ability to{' '}
                        <strong>use a gradient depending on chart element value</strong>. Last but
                        not least, <strong>gradient colors can be inherited</strong> from current
                        node ones.
                    </p>
                    <h2>Example</h2>
                    <GradientsExample />
                    <h2>Known limitations</h2>
                    <p>
                        Please be aware that gradient usage has some limitations, it's{' '}
                        <strong>not supported for canvas</strong> chart implementations for now, and
                        tooltips involving colored chips will use plain element color.
                    </p>
                </DescriptionBlock>
            </Layout>
        )
    }
}
