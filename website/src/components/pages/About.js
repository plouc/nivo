/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

const About = () => (
    <div className="inner-content">
        <div className="page_content">
            <Helmet title="About" />
            <div className="guide__header">
                <h1 className="page_header">About</h1>
            </div>
            <div className="guide__description text-content">
                <p>
                    <a
                        href="https://github.com/plouc/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        nivo
                    </a>{' '}
                    provides supercharged React components to easily build dataviz apps, it's built
                    on top of d3.
                </p>
                <p>
                    Several libraries already exist for React d3 integration, but just a few provide
                    server side rendering ability and fully declarative charts.
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
                        <Link
                            to={{
                                pathname: '/components',
                                search: '?filter=svg',
                            }}
                        >
                            SVG charts
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={{
                                pathname: '/components',
                                search: '?filter=html',
                            }}
                        >
                            HTML charts
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={{
                                pathname: '/components',
                                search: '?filter=canvas',
                            }}
                        >
                            Canvas charts
                        </Link>
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
                        <Link to="/guides/patterns">SVG patterns</Link>
                    </li>
                    <li>
                        <Link to="/guides/gradients">Gradients</Link>
                    </li>
                    <li>
                        <Link
                            to={{
                                pathname: '/components',
                                search: '?q=responsive',
                            }}
                        >
                            Responsive charts
                        </Link>
                    </li>
                </ul>
                <h2>Repositories</h2>
                <ul>
                    <li>
                        <a
                            href="https://github.com/plouc/nivo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo
                        </a>{' '}
                        - nivo{' '}
                        <a
                            href="https://www.npmjs.com/~nivo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            packages
                        </a>
                        ,{' '}
                        <a href="https://nivo.rocks" target="_blank" rel="noopener noreferrer">
                            website
                        </a>
                        ,{' '}
                        <a
                            href="https://nivo.rocks/storybook/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            storybook
                        </a>{' '}
                        and examples
                    </li>
                    <li>
                        <a
                            href="https://github.com/plouc/nivo-api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo-api
                        </a>{' '}
                        - the nivo http api
                    </li>
                    <li>
                        <a
                            href="https://github.com/plouc/nivo-api-docker"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo-api-docker
                        </a>{' '}
                        - a Docker image for the nivo http api
                    </li>
                </ul>
            </div>
        </div>
    </div>
)

export default About
