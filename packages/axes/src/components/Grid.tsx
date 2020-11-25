import React, { useMemo } from 'react'
import { GridLines } from './GridLines'
import { computeGridLines } from '../compute'
import { AnyScale } from '../types'

export const Grid = <X extends number | string | Date, Y extends number | string | Date>({
    width,
    height,
    xScale,
    yScale,
    xValues,
    yValues,
}: {
    width: number
    height: number
    xScale?: AnyScale
    xValues?: number | X[]
    yScale?: AnyScale
    yValues?: number | Y[]
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
