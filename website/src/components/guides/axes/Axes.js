/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import AxesPosition from './AxesPosition'
import AxesTicks from './AxesTicks'
import AxesLegend from './AxesLegend'

export default class Axes extends Component {
    render() {
        return (
            <div className="inner-content">
                <Helmet title="Axes" />
                <div className="page_content">
                    <div className="guide__header">
                        <h1 className="page_header">Axes</h1>
                    </div>
                </div>
                <div className="guide__description text-content">
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
                </div>
                <AxesPosition />
                <AxesTicks />
                <AxesLegend />
            </div>
        )
    }
}
