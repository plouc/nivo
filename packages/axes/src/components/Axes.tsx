import React from 'react'
import { Axis } from './Axis'
import { AllScales, AxisProp } from '../types'

const positions = ['top', 'right', 'bottom', 'left'] as const

export const Axes = <X extends number | string | Date, Y extends number | string | Date>({
    xScale,
    yScale,
    width,
    height,
    top,
    right,
    bottom,
    left,
}: {
    xScale: AllScales
    yScale: AllScales
    width: number
    height: number
    top?: AxisProp<X>
    right?: AxisProp<Y>
    bottom?: AxisProp<X>
    left?: AxisProp<Y>
}) => {
    const axes = { top, right, bottom, left }

    return (
        <>
            {positions.map(position => {
                const axis = axes[position]

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
