/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import CartesianMarkersItem from './CartesianMarkersItem'

const CartesianMarkers = ({ markers, width, height, xScale, yScale, theme }) => {
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
    }).isRequired,

    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),
}

export default pure(CartesianMarkers)
