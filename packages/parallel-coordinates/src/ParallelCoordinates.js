/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SvgWrapper, useDimensions, withContainer } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { commonPropTypes, commonDefaultProps } from './props'
import { useParallelCoordinates } from './hooks'
import ParallelCoordinatesLine from './ParallelCoordinatesLine'

const ParallelCoordinates = ({
    data,
    variables,
    layout,
    width,
    height,
    margin: partialMargin,
    axesPlan,
    axesTicksPosition,
    strokeWidth,
    lineOpacity,
    curve,
    colors,
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        variablesScale,
        variablesWithScale,
        dataWithPoints,
        lineGenerator,
        getLineColor,
    } = useParallelCoordinates({
        width: innerWidth,
        height: innerHeight,
        data,
        variables,
        layout,
        colors,
        curve,
    })

    const axes = variablesWithScale.map(variable => (
        <Axis
            key={variable.key}
            axis={layout === 'horizontal' ? 'y' : 'x'}
            length={layout === 'horizontal' ? innerHeight : innerWidth}
            x={layout === 'horizontal' ? variablesScale(variable.key) : 0}
            y={layout === 'horizontal' ? 0 : variablesScale(variable.key)}
            scale={variable.scale}
            ticksPosition={variable.ticksPosition || axesTicksPosition}
            tickValues={variable.tickValues}
            tickSize={variable.tickSize}
            tickPadding={variable.tickPadding}
            tickRotation={variable.tickRotation}
            format={variable.tickFormat}
            legend={variable.legend}
            legendPosition={variable.legendPosition}
            legendOffset={variable.legendOffset}
        />
    ))

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
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
                />
            ))}
            {axesPlan === 'foreground' && axes}
        </SvgWrapper>
    )
}

ParallelCoordinates.propTypes = commonPropTypes

const WrappedParallelCoordinates = withContainer(ParallelCoordinates)
WrappedParallelCoordinates.defaultProps = commonDefaultProps

export default WrappedParallelCoordinates
