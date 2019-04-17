/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import PageContent from '../components/PageContent'
import { DescriptionBlock } from '../components/styled'

const About = () => {
    return (
        <Layout>
            <PageContent>
                <SEO title="About" />
                <div className="guide__header">
                    <h1>About</h1>
                </div>
                <DescriptionBlock>
                    <p>
                        <a
                            href="https://github.com/plouc/nivo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo
                        </a>{' '}
                        provides supercharged React components to easily build dataviz apps, it's
                        built on top of d3.
                    </p>
                    <p>
                        Several libraries already exist for React d3 integration, but just a few
                        provide server side rendering ability and fully declarative charts.
                    </p>
                    <h2>Features</h2>
                    <ul>
                        <li>Highly customizable</li>
                        <li>
                            Motion/transitions, powered by{' '}
                            <a
                                href="https://github.com/chenglou/react-motion"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                react-motion
                            </a>
                        </li>
                        <li>Component playground</li>
                        <li>Exhaustive documentation</li>
                        <li>Isomorphic rendering</li>
                        <li>
                            <Link to="/components?filter=svg">SVG charts</Link>
                        </li>
                        <li>
                            <Link to="/components?filter=html">HTML charts</Link>
                        </li>
                        <li>
                            <Link to="/components?filter=canvas">Canvas charts</Link>
                        </li>
                        <li>
                            <a
                                href="https://github.com/plouc/nivo-api"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Server side rendering API
                            </a>
                        </li>
                        <li>
                            <Link to="/guides/legends">Legends</Link>
                        </li>
                        <li>
                            <Link to="/guides/annotations">Annotations</Link>
                        </li>
                        <li>
                            <Link to="/guides/patterns">SVG patterns</Link>
                        </li>
                        <li>
                            <Link to="/guides/gradients">Gradients</Link>
                        </li>
                        <li>Responsive charts</li>
                    </ul>
                </DescriptionBlock>
            </PageContent>
        </Layout>
    )
}

export default About
