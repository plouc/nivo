import { memo } from 'react'
import { ScaleValue, AnyScale } from '@nivo/scales'
import { Axis } from './Axis'
import { positions } from '../props'
import { AxisProps } from '../types'

export const Axes = memo(
    <X extends ScaleValue, Y extends ScaleValue>({
        xScale,
        yScale,
        x = 0,
        y = 0,
        width,
        height,
        top,
        right,
        bottom,
        left,
    }: {
        xScale: AnyScale
        yScale: AnyScale
        x?: number
        y?: number
        width: number
        height: number
        top?: AxisProps<X> | null
        right?: AxisProps<Y> | null
        bottom?: AxisProps<X> | null
        left?: AxisProps<Y> | null
    }) => {
        const axes = { top, right, bottom, left }

        return (
            <>
                {positions.map(position => {
                    const axis = axes[position] as typeof position extends 'bottom' | 'top'
                        ? AxisProps<X> | undefined
                        : AxisProps<Y> | undefined

                    if (!axis) return null

                    const isXAxis = position === 'top' || position === 'bottom'
                    const ticksPosition =
                        position === 'top' || position === 'left' ? 'before' : 'after'

                    return (
                        <Axis
                            key={position}
                            {...axis}
                            axis={isXAxis ? 'x' : 'y'}
                            x={position === 'right' ? x + width : x}
                            y={position === 'bottom' ? y + height : y}
                            scale={isXAxis ? xScale : yScale}
                            length={isXAxis ? width : height}
                            ticksPosition={ticksPosition}
                        />
                    )
                })}
            </>
        )
    }
)
