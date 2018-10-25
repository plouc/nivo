/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import merge from 'lodash/merge'
import { withTheme } from 'styled-components'
import { Axes } from '@nivo/axes'
import Banner from '../../Banner'
import GuideIllustrations from '../GuideIllustrations'
import { linearXScale, linearYScale } from './scales'
import theme from './theme'

class AxesPosition extends Component {
    render() {
        const {
            theme: { nivo: nivoTheme },
        } = this.props

        return (
            <Fragment>
                <div className="guide__description text-content">
                    <h2 id="position">Axis position</h2>
                    <p>
                        Axis position is determined by the property you use{' '}
                        <strong>(top|right|bottom|left)Axis</strong>.
                    </p>
                </div>
                <Banner>
                    <GuideIllustrations>
                        <svg role="img" width={380} height={260}>
                            <g transform="translate(50,50)">
                                <Axes
                                    xScale={linearXScale}
                                    yScale={linearYScale}
                                    width={280}
                                    height={160}
                                    theme={merge({}, nivoTheme, theme)}
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
                            </g>
                        </svg>
                    </GuideIllustrations>
                </Banner>
            </Fragment>
        )
    }
}

export default withTheme(AxesPosition)
