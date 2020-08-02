/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ThemeProvider, MotionConfigProvider } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { linearXScale, pointXScale, timeXScale, timeXScaleHours } from './scales'
import { FullWidthBanner, DescriptionBlock } from '../../styled'
import { useAxisTheme } from './theme'

const AxesTicks = () => {
    const theme = useAxisTheme()

    return (
        <>
            <DescriptionBlock>
                <h2 id="ticks">Axis ticks</h2>
                <p>
                    Axes are composed of <strong>ticks</strong>, you can control the way they are
                    computed and their aspect. By default, computing which ticks are displayed is
                    managed by the corresponding{' '}
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
                        an array of values, which should be numbers for a linear scale, values being
                        part of the dataset for point scales, or dates for time scales.
                    </li>
                    <li>
                        a number which define the number of ticks to display,{' '}
                        <strong>doesn't work with point scale</strong>, also note that when using
                        this form{' '}
                        <strong>
                            it's not guaranteed that you'll have exactly the number of ticks you
                            asked for
                        </strong>{' '}
                        as d3 will make an educated guess to define them.
                    </li>
                    <li>
                        a time interval, for example <code>every day</code> or{' '}
                        <code>every 15 minutes</code>,{' '}
                        <strong>only works when using time scales</strong>.
                    </li>
                </ul>
            </DescriptionBlock>
            <FullWidthBanner>
                <ThemeProvider theme={theme}>
                    <MotionConfigProvider animate={false}>
                        <div
                            className="guide__illustrations"
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <svg role="img" width={380} height={191}>
                                <g transform={`translate(50,50)`}>
                                    <Axis
                                        axis="x"
                                        scale={pointXScale}
                                        tickValues={['A', 'C', 'E', 'G', 'I']}
                                        length={280}
                                        theme={theme}
                                        animate={false}
                                        legend="point scale ['A', 'C', 'E', 'G', 'I']"
                                        legendPosition="start"
                                        legendOffset={-38}
                                        ticksPosition="before"
                                    />
                                </g>
                                <g transform={`translate(50,120)`}>
                                    <Axis
                                        axis="x"
                                        scale={linearXScale}
                                        tickValues={[0, 20, 40, 60, 80]}
                                        length={280}
                                        theme={theme}
                                        animate={false}
                                        legend="linear scale [0, 20, 40, 60, 80]"
                                        legendPosition="start"
                                        legendOffset={-38}
                                        ticksPosition="before"
                                    />
                                </g>
                                <g transform={`translate(50,190)`}>
                                    <Axis
                                        axis="x"
                                        scale={timeXScale}
                                        tickValues={[
                                            new Date(2019, 0, 1, 0, 0, 0, 0),
                                            new Date(2019, 6, 1, 0, 0, 0, 0),
                                            new Date(2020, 0, 1, 0, 0, 0, 0),
                                        ]}
                                        length={280}
                                        theme={theme}
                                        format="%Y/%m"
                                        animate={false}
                                        legend="time scale with three dates"
                                        legendPosition="start"
                                        legendOffset={-38}
                                        ticksPosition="before"
                                    />
                                </g>
                            </svg>
                            <svg role="img" width={380} height={191}>
                                <g transform={`translate(50,50)`}>
                                    <Axis
                                        axis="x"
                                        scale={timeXScaleHours}
                                        tickValues="every 15 minutes"
                                        format="%H:%M"
                                        length={280}
                                        theme={theme}
                                        animate={false}
                                        legend="time scale, every 15 minutes"
                                        legendPosition="start"
                                        legendOffset={-38}
                                        ticksPosition="before"
                                    />
                                </g>
                                <g transform={`translate(50,120)`}>
                                    <Axis
                                        axis="x"
                                        scale={linearXScale}
                                        tickValues={5}
                                        length={280}
                                        theme={theme}
                                        animate={false}
                                        legend="linear scale, tickValues: 5"
                                        legendPosition="start"
                                        legendOffset={-38}
                                        ticksPosition="before"
                                    />
                                </g>
                                <g transform={`translate(50,190)`}>
                                    <Axis
                                        axis="x"
                                        scale={timeXScale}
                                        tickValues={5}
                                        length={280}
                                        theme={theme}
                                        format="%Y/%m"
                                        animate={false}
                                        legend="time scale, tickValues: 5"
                                        legendPosition="start"
                                        legendOffset={-38}
                                        ticksPosition="before"
                                    />
                                </g>
                            </svg>
                        </div>
                    </MotionConfigProvider>
                </ThemeProvider>
            </FullWidthBanner>
        </>
    )
}

export default AxesTicks
