/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import PageContent from '../components/PageContent'
import { DescriptionBlock } from '../components/styled'
import GitHubIcon from 'react-icons/lib/fa/github'
import styled, { css } from 'styled-components'

const References = () => {
    return (
        <Layout>
            <PageContent>
                <SEO title="References" />
                <div className="guide__header">
                    <h1>References</h1>
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
                        was inspired by great projects who helped to imagine and develop all the
                        features.
                    </p>
                    <h2>References</h2>
                    <ul>
                        <li>
                            <a
                                href="https://2017.stateofjs.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                State of js 2017
                            </a>
                            <GitHubLink
                                href="https://github.com/StateOfJS/StateOfJS"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <GitHubIcon />
                            </GitHubLink>
                        </li>
                        <li>
                            <a
                                href="https://batbstats.trevorblades.com/skaters"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Batbstats
                            </a>
                            <GitHubLink
                                href="https://github.com/batbstats/client"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <GitHubIcon />
                            </GitHubLink>
                        </li>
                        <li>
                            <a
                                href="https://spacetime.graph.zone/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Spacetime reviews
                            </a>
                            <GitHubLink
                                href="https://github.com/johnymontana/spacetime-reviews"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <GitHubIcon />
                            </GitHubLink>
                        </li>
                    </ul>
                </DescriptionBlock>
            </PageContent>
        </Layout>
    )
}

export default References

const GitHubLink = styled.a`
    text-decoration: none;
    text-transform: uppercase;
    border-bottom: none;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    cursor: pointer;

    & svg {
        font-size: 20px;
    }
`
