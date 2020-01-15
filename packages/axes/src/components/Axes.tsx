/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Axis, AxisProp } from './Axis'

export interface AxesProps<X extends number | string | Date, Y extends number | string | Date> {
    xScale: any
    yScale: any
    width: number
    height: number
    top?: AxisProp<X>
    right?: AxisProp<Y>
    bottom?: AxisProp<X>
    left?: AxisProp<Y>
}

export const Axes = <X extends number | string | Date, Y extends number | string | Date>({
    xScale,
    yScale,
    width,
    height,
    top,
    right,
    bottom,
    left,
}: AxesProps<X, Y>) => (
    <>
        {top && <Axis<X> {...top} axis="x" scale={xScale} length={width} ticksPosition="before" />}
        {right && (
            <Axis<Y>
                {...right}
                axis="y"
                scale={yScale}
                x={width}
                length={height}
                ticksPosition="after"
            />
        )}
        {bottom && (
            <Axis<X>
                {...bottom}
                axis="x"
                scale={xScale}
                y={height}
                length={width}
                ticksPosition="after"
            />
        )}
        {left && <Axis<Y> axis="y" scale={yScale} length={height} ticksPosition="before" />}
    </>
)
