/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { MarkersTheme } from '../../../theming'
import { CartesianMarkersItem } from './CartesianMarkersItem'

interface Marker {
    axis: 'x' | 'y'
    value: number | string | Date
    lineStyle?: Partial<React.CSSProperties>
    textStyle?: Partial<React.CSSProperties>
}

export interface CartesianMarkersProps {
    width: number
    height: number
    xScale: any
    yScale: any
    markers: Marker[]
    theme: {
        markers: MarkersTheme
    }
}

export const CartesianMarkers: React.SFC<CartesianMarkersProps> = React.memo(
    ({ markers, width, height, xScale, yScale, theme }) => {
        if (!markers || markers.length === 0) return null

        return (
            <g>
                {markers.map((marker, i) => (
                    <CartesianMarkersItem
                        key={i}
                        {...marker}
                        width={width}
                        height={height}
                        scale={marker.axis === 'y' ? yScale : xScale}
                        theme={theme}
                    />
                ))}
            </g>
        )
    }
)

CartesianMarkers.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    theme: PropTypes.shape({
        markers: PropTypes.shape({
            lineColor: PropTypes.string.isRequired,
            lineStrokeWidth: PropTypes.number.isRequired,
            textColor: PropTypes.string.isRequired,
            fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        }).isRequired,
    }).isRequired as React.Requireable<{
        markers: MarkersTheme
    }>,
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            lineStyle: PropTypes.object,
            textStyle: PropTypes.object,
        })
    ) as React.Requireable<Marker[]>,
}
