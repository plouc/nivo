import { useMemo, memo } from 'react'
import { ScaleValue, AnyScale, TicksSpec } from '@nivo/scales'
import { GridLines } from './GridLines'
import { computeGridLines } from '../compute'

export const Grid = memo(
    <X extends ScaleValue, Y extends ScaleValue>({
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
