import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import PageContent from '../components/PageContent'
import { DescriptionBlock } from '../components/styled'

const Faq = () => (
    <Layout>
        <PageContent>
            <Seo title="Frequently Asked Questions" />
            <div className="guide__header">
                <h1>Frequently Asked Questions and Answers</h1>
            </div>
            <DescriptionBlock>
                <h4>Why should I use nivo instead of X?</h4>
                <p>
                    nivo provides quite high level components, so it should be used if you have no
                    prior experience with d3 or want a quick/easy setup. Also its components can be
                    easily tweaked by adjusting a few <i>knobs</i>, and offers various flavors for
                    each chart types.
                </p>
                <h4>Are nivo components SSR compliant?</h4>
                <p>
                    Yes, sure! nivo was built with this requirement in mind from the very beginning,
                    you even have an HTTP rendering API for most components :)
                    <br />
                    Just make sure to use <Link to="/components?filter=svg">SVG</Link> or{' '}
                    <Link to="/components?filter=html">HTML</Link> implementations.
                </p>
                <h4>Can I use nivo with very large data set?</h4>
                <p>
                    Yes you can! SVG/HTML do not perform well when dealing with thousands of nodes,
                    that's why you have some{' '}
                    <Link to="/components?filter=canvas">canvas based implementations</Link> which
                    are able to handle larger quantities of data.
                </p>
                <h4>My component isn't rendering</h4>
                <p>
                    Check if the parent has a defined height, otherwise the responsive component
                    won't be able to render.
                </p>
            </DescriptionBlock>
        </PageContent>
    </Layout>
)

export default Faq
