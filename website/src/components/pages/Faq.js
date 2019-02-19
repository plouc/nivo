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

const Faq = () => (
    <div className="inner-content">
        <div className="page_content">
            <Helmet title="Frequently Asked Questions" />
            <div className="guide__header">
                <h1 className="page_header">Frequently Asked Questions and Answers</h1>
            </div>
            <div className="guide__description text-content">
                <h4>Why should I use nivo instead of X?</h4>
                <p>
                    nivo provides quite high level components, so it should be used if you have no
                    prior experience with d3 or want a quick/easy setup. Also its components can be
                    easily tweaked by adjusting a few <i>knobs</i>, and offers various flavors for
                    each chart types.
                </p>
                <h4>Are nivo components SSR compliants?</h4>
                <p>
                    Yes, sure! nivo was built with this requirement in mind from the very beginning,
                    you even have an HTTP rendering API for most components :)
                    <br />
                    Just make sure to use{' '}
                    <Link
                        to={{
                            pathname: '/components',
                            search: '?filter=svg',
                        }}
                    >
                        SVG
                    </Link>{' '}
                    or{' '}
                    <Link
                        to={{
                            pathname: '/components',
                            search: '?filter=html',
                        }}
                    >
                        HTML
                    </Link>{' '}
                    implementations.
                </p>
                <h4>Can I use nivo with very large data set?</h4>
                <p>
                    Yes you can! SVG/HTML are not performing very well when dealing with thousands
                    of nodes, that's why you have some{' '}
                    <Link
                        to={{
                            pathname: '/components',
                            search: '?filter=canvas',
                        }}
                    >
                        canvas based implementations
                    </Link>{' '}
                    which are able to handle pretty large ones.
                </p>
                <h4>My component isn't rendering</h4>
                <p>
                    Check if the parent have a define height, otherwise the responsive component
                    won't be able to render.
                </p>
            </div>
        </div>
    </div>
)

export default Faq
