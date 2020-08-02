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
import { Axes } from '@nivo/axes'
import { linearXScale, linearYScale } from './scales'
import { FullWidthBanner, DescriptionBlock } from '../../styled'
import { useAxisTheme } from './theme'

const AxesPosition = () => {
    const theme = useAxisTheme()

    return (
        <>
            <DescriptionBlock>
                <h2 id="position">Axis position</h2>
                <p>
                    Axis position is determined by the property you use{' '}
                    <strong>(top|right|bottom|left)Axis</strong>.
                </p>
            </DescriptionBlock>
            <FullWidthBanner>
                <div className="guide__illustrations">
                    <svg role="img" width={380} height={260}>
                        <g transform="translate(50,50)">
                            <ThemeProvider theme={theme}>
                                <MotionConfigProvider animate={false}>
                                    <Axes
                                        xScale={linearXScale}
                                        yScale={linearYScale}
                                        width={280}
                                        height={160}
                                        animate={false}
                                        motionStiffness={0}
                                        motionDamping={0}
                                        top={{
                                            legend: 'axisTop',
                                            legendPosition: 'middle',
                                            legendOffset: -32,
                                        }}
                                        right={{
                                            legend: 'axisRight',
                                            legendPosition: 'middle',
                                            legendOffset: 42,
                                        }}
                                        bottom={{
                                            legend: 'axisBottom',
                                            legendPosition: 'middle',
                                            legendOffset: 38,
                                        }}
                                        left={{
                                            legend: 'axisLeft',
                                            legendPosition: 'middle',
                                            legendOffset: -36,
                                        }}
                                    />
                                </MotionConfigProvider>
                            </ThemeProvider>
                        </g>
                    </svg>
                </div>
            </FullWidthBanner>
        </>
    )
}

export default AxesPosition
