/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { withMotion, Container, SvgWrapper } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { commonPropTypes, commonDefaultProps } from './props'
import { commonEnhancers } from './enhance'
import ParallelCoordinatesLayout from './ParallelCoordinatesLayout'
import ParallelCoordinatesLine from './ParallelCoordinatesLine'

export class ParallelCoordinates extends Component {
    static propTypes = commonPropTypes

    render() {
        const {
            data,
            variables,
            layout,
            margin,
            width,
            height,
            outerWidth,
            outerHeight,
            axesPlan,
            axesTicksPosition,
            lineGenerator,
            strokeWidth,
            lineOpacity,
            getLineColor,
            theme,
            animate,
            motionStiffness,
            motionDamping,
            isInteractive,
        } = this.props

        const motionProps = {
            animate,
            motionStiffness,
            motionDamping,
        }

        return (
            <ParallelCoordinatesLayout
                width={width}
                height={height}
                data={data}
                variables={variables}
                layout={layout}
            >
                {({ variablesScale, variablesWithScale, dataWithPoints }) => {
                    const axes = variablesWithScale.map(variable => (
                        <Axis
                            key={variable.key}
                            axis={layout === 'horizontal' ? 'y' : 'x'}
                            length={layout === 'horizontal' ? height : width}
                            x={layout === 'horizontal' ? variablesScale(variable.key) : 0}
                            y={layout === 'horizontal' ? 0 : variablesScale(variable.key)}
                            scale={variable.scale}
                            ticksPosition={variable.ticksPosition || axesTicksPosition}
                            tickValues={variable.tickValues}
                            tickSize={variable.tickSize}
                            tickPadding={variable.tickPadding}
                            tickRotation={variable.tickRotation}
                            tickFormat={variable.tickFormat}
                            legend={variable.legend}
                            legendPosition={variable.legendPosition}
                            legendOffset={variable.legendOffset}
                            theme={theme}
                            {...motionProps}
                        />
                    ))

                    return (
                        <Container isInteractive={isInteractive} theme={theme}>
                            {({ showTooltip, hideTooltip }) => (
                                <SvgWrapper
                                    width={outerWidth}
                                    height={outerHeight}
                                    margin={margin}
                                    theme={theme}
                                >
                                    {axesPlan === 'background' && axes}
                                    {dataWithPoints.map(datum => (
                                        <ParallelCoordinatesLine
                                            key={datum.index}
                                            data={datum}
                                            variables={variables}
                                            lineGenerator={lineGenerator}
                                            points={datum.points}
                                            strokeWidth={strokeWidth}
                                            opacity={lineOpacity}
                                            color={getLineColor(datum)}
                                            theme={theme}
                                            showTooltip={showTooltip}
                                            hideTooltip={hideTooltip}
                                            {...motionProps}
                                        />
                                    ))}
                                    {axesPlan === 'foreground' && axes}
                                </SvgWrapper>
                            )}
                        </Container>
                    )
                }}
            </ParallelCoordinatesLayout>
        )
    }
}

const enhance = compose(
    defaultProps(commonDefaultProps),
    ...commonEnhancers,
    withMotion(),
    pure
)

export default setDisplayName('ParallelCoordinates')(enhance(ParallelCoordinates))
