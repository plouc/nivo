import React from 'react'
import { Axis } from './Axis'
import { positions } from '../props'
import { AnyScale, SingleAxisProp, AxisValue } from '../types'

export const Axes = <X extends AxisValue, Y extends AxisValue>({
    xScale,
    yScale,
    width,
    height,
    top,
    right,
    bottom,
    left,
}: {
    xScale: AnyScale
    yScale: AnyScale
    width: number
    height: number
    top?: SingleAxisProp<X>
    right?: SingleAxisProp<Y>
    bottom?: SingleAxisProp<X>
    left?: SingleAxisProp<Y>
}) => {
    const axes = { top, right, bottom, left }

    return (
        <>
            {positions.map(position => {
                const axis = axes[position] as typeof position extends 'bottom' | 'top'
                    ? SingleAxisProp<X> | undefined
                    : SingleAxisProp<Y> | undefined

                if (!axis) return null

                const isXAxis = position === 'top' || position === 'bottom'
                const ticksPosition = position === 'top' || position === 'left' ? 'before' : 'after'

                return (
                    <Axis
                        key={position}
                        {...axis}
                        axis={isXAxis ? 'x' : 'y'}
                        x={position === 'right' ? width : 0}
                        y={position === 'bottom' ? height : 0}
                        scale={isXAxis ? xScale : yScale}
                        length={isXAxis ? width : height}
                        ticksPosition={ticksPosition}
                    />
                )
            })}
        </>
    )
}
