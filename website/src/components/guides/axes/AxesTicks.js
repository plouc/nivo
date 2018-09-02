/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import { Axis } from '@nivo/core'
import { linearXScale, pointXScale, timeXScale } from './scales'
import theme from './theme'

export default class AxesTicks extends Component {
    render() {
        return (
            <Fragment>
                <div className="guide__description text-content">
                    <h2 id="ticks">Axis ticks</h2>
                    <p>
                        Axes are composed of <strong>ticks</strong>, you can control the way they
                        are computed and their aspect. By default, computing which ticks are
                        displayed is managed by the corresponding{' '}
                        <a
                            href="https://github.com/d3/d3-scale"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            d3 scale
                        </a>
                        .
                    </p>
                    <h3 id="ticks-values">Ticks values</h3>
                    <p>
                        You can use the <code>tickValues</code> property in order to customize the
                        displayed ticks, it accepts several forms:
                    </p>
                    <ul>
                        <li>
                            an array of values, which should be numbers for a linear scale, values
                            being part of the dataset for point scales, or dates for time scales.
                        </li>
                        <li>
                            a number which define the number of ticks to display,{' '}
                            <strong>doesn't work with point scale</strong>, also note that when
                            using this form{' '}
                            <strong>
                                it's not guaranteed that you'll have exactly the number of ticks you
                                asked for
                            </strong>{' '}
                            as d3 will make an educated guess to define them.
                        </li>
                    </ul>
                </div>
                <div className="banner">
                    <div
                        className="guide__illustrations"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <svg role="img" width={380} height={180}>
                            <g transform={`translate(50,40)`}>
                                <Axis
                                    scale={pointXScale}
                                    tickValues={['A', 'C', 'E', 'G', 'I']}
                                    width={280}
                                    height={0}
                                    position="top"
                                    theme={theme}
                                    animate={false}
                                    motionStiffness={0}
                                    motionDamping={0}
                                    legend="point scale ['A', 'C', 'E', 'G', 'I']"
                                    legendPosition="start"
                                    legendOffset={-32}
                                />
                            </g>
                            <g transform={`translate(50,110)`}>
                                <Axis
                                    scale={linearXScale}
                                    tickValues={[0, 20, 40, 60, 80]}
                                    width={280}
                                    height={0}
                                    position="top"
                                    theme={theme}
                                    animate={false}
                                    motionStiffness={0}
                                    motionDamping={0}
                                    legend="linear scale [0, 20, 40, 60, 80]"
                                    legendPosition="start"
                                    legendOffset={-32}
                                />
                            </g>
                            <g transform={`translate(50,180)`}>
                                <Axis
                                    scale={timeXScale}
                                    tickValues={[
                                        new Date(2019, 0, 1, 0, 0, 0, 0),
                                        new Date(2019, 6, 1, 0, 0, 0, 0),
                                        new Date(2020, 0, 1, 0, 0, 0, 0),
                                    ]}
                                    width={280}
                                    height={0}
                                    position="top"
                                    theme={theme}
                                    format="%Y/%m"
                                    animate={false}
                                    motionStiffness={0}
                                    motionDamping={0}
                                    legend="time scale with tree dates"
                                    legendPosition="start"
                                    legendOffset={-32}
                                />
                            </g>
                        </svg>
                        <svg role="img" width={380} height={180}>
                            <g transform={`translate(50,110)`}>
                                <Axis
                                    scale={linearXScale}
                                    tickValues={5}
                                    width={280}
                                    height={0}
                                    position="top"
                                    theme={theme}
                                    animate={false}
                                    motionStiffness={0}
                                    motionDamping={0}
                                    legend="linear scale, tickValues: 5"
                                    legendPosition="start"
                                    legendOffset={-32}
                                />
                            </g>
                            <g transform={`translate(50,180)`}>
                                <Axis
                                    scale={timeXScale}
                                    tickValues={5}
                                    width={280}
                                    height={0}
                                    position="top"
                                    theme={theme}
                                    format="%Y/%m"
                                    animate={false}
                                    motionStiffness={0}
                                    motionDamping={0}
                                    legend="time scale, tickValues: 5"
                                    legendPosition="start"
                                    legendOffset={-32}
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </Fragment>
        )
    }
}
