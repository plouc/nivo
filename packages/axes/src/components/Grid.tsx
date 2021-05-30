import React, { useMemo, memo } from 'react'
import { GridLines } from './GridLines'
import { computeGridLines } from '../compute'
import { AnyScale, AxisValue, TicksSpec } from '../types'

export const Grid = memo(
    <X extends AxisValue, Y extends AxisValue>({
        width,
        height,
        xScale,
        yScale,
        xValues,
        yValues,
    }: {
        width: number
        height: number
        xScale?: AnyScale | null
        xValues?: TicksSpec<X>
        yScale?: AnyScale | null
        yValues?: TicksSpec<Y>
    }) => {
        const xLines = useMemo(() => {
            if (!xScale) return false

            return computeGridLines({
                width,
                height,
                scale: xScale,
                axis: 'x',
                values: xValues,
            })
        }, [xScale, xValues, width, height])

        const yLines = useMemo(() => {
            if (!yScale) return false

            return computeGridLines({
                width,
                height,
                scale: yScale,
                axis: 'y',
                values: yValues,
            })
        }, [height, width, yScale, yValues])

        return (
            <>
                {xLines && <GridLines lines={xLines} />}
                {yLines && <GridLines lines={yLines} />}
            </>
        )
    }
)
