/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { CSSProperties } from 'react'
import { CartesianMarkersItem } from './CartesianMarkersItem'

export interface CartesianMarkerSpec<Value extends number | string | Date = number> {
    axis: 'x' | 'y'
    // Value should be number, string or Date
    value: Value
    lineStyle?: CSSProperties
    textStyle?: CSSProperties
}

interface CartesianMarkersProps<Value extends number | string | Date> {
    markers: Array<CartesianMarkerSpec<Value>>
    width: number
    height: number
    xScale: (v: Value) => number
    yScale: (v: Value) => number
}

export const CartesianMarkers = <Value extends number | string | Date>({
    markers,
    width,
    height,
    xScale,
    yScale,
}: CartesianMarkersProps<Value>) => {
    if (!markers || markers.length === 0) {
        return null
    }

    return markers.map((marker, i) => (
        <CartesianMarkersItem<Value>
            key={i}
            {...marker}
            width={width}
            height={height}
            scale={marker.axis === 'y' ? yScale : xScale}
        />
    ))
}
