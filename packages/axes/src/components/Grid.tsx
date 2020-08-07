/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import { GridLines } from './GridLines'
import { computeGridLines } from '../compute'

export interface GridProps<X extends number | string | Date, Y extends number | string | Date> {
    width: number
    height: number
    xScale?: (v: X) => number
    xValues?: X[]
    yScale?: (v: Y) => number
    yValues?: Y[]
}

export const Grid = <X extends number | string | Date, Y extends number | string | Date>({
    width,
    height,
    xScale,
    yScale,
    xValues,
    yValues,
}: GridProps<X, Y>) => {
    const xLines = useMemo(() => {
        if (!xScale) {
            return false
        }

        return computeGridLines<X>({
            width,
            height,
            scale: xScale,
            axis: 'x',
            values: xValues,
        })
    }, [xScale, xValues])

    const yLines = yScale
        ? computeGridLines<Y>({
              width,
              height,
              scale: yScale,
              axis: 'y',
              values: yValues,
          })
        : false

    return (
        <>
            {xLines && <GridLines lines={xLines} />}
            {yLines && <GridLines lines={yLines} />}
        </>
    )
}
