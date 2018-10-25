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
import { Axis } from '@nivo/axes'
import Banner from '../../Banner'
import GuideIllustrations from '../GuideIllustrations'
import { linearXScale, linearYScale } from './scales'
import theme from './theme'

const axisPositions = ['start', 'middle', 'end']

class AxesLegend extends Component {
    render() {
        const {
            theme: { nivo: nivoTheme },
        } = this.props
        const finalTheme = merge({}, nivoTheme, theme)

        return (
            <Fragment>
                <div className="guide__description text-content">
                    <h2 id="legend">Axis legend</h2>
                    <p>
                        You can optionally add a legend to an axis by setting the value of the{' '}
                        <code>legend</code> property.
                    </p>
                    <h3 id="legend-position">Legend position</h3>
                    <p>
                        Legend position is controlled by two properties, <code>legendPosition</code>{' '}
                        and <code>legendOffset</code>.<code>legendPosition</code> must be one of:{' '}
                        <code>start</code>, <code>middle</code> or <code>end</code>,{' '}
                        <code>legendOffset</code> will affect y position for <strong>top</strong>{' '}
                        and <strong>bottom</strong> axes and x position for <strong>left</strong>{' '}
                        and <strong>right</strong> axes.
                    </p>
                </div>
                <Banner>
                    <GuideIllustrations style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <svg role="img" width={380} height={180}>
                            {axisPositions.map((position, i) => (
                                <g key={position} transform={`translate(50,${i * 70 + 40})`}>
                                    <Axis
                                        axis="x"
                                        scale={linearXScale}
                                        width={280}
                                        height={0}
                                        position="top"
                                        theme={finalTheme}
                                        animate={false}
                                        motionStiffness={0}
                                        motionDamping={0}
                                        legend={position}
                                        legendPosition={position}
                                        legendOffset={-32}
                                    />
                                </g>
                            ))}
                        </svg>
                        <svg role="img" width={260} height={260}>
                            {axisPositions.map((position, i) => (
                                <g key={position} transform={`translate(${i * 90 + 50},50)`}>
                                    <Axis
                                        axis="x"
                                        scale={linearYScale}
                                        width={0}
                                        height={160}
                                        position="left"
                                        theme={finalTheme}
                                        animate={false}
                                        motionStiffness={0}
                                        motionDamping={0}
                                        legend={position}
                                        legendPosition={position}
                                        legendOffset={-32}
                                    />
                                </g>
                            ))}
                        </svg>
                    </GuideIllustrations>
                </Banner>
            </Fragment>
        )
    }
}

export default withTheme(AxesLegend)
