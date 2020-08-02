/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

const GeoMapFeature = memo(
    ({
        feature,
        path,
        fillColor,
        borderWidth,
        borderColor,
        onClick,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
    }) => {
        return (
            <path
                key={feature.id}
                fill={fillColor}
                strokeWidth={borderWidth}
                stroke={borderColor}
                strokeLinejoin="bevel"
                d={path(feature)}
                onMouseEnter={event => onMouseEnter(feature, event)}
                onMouseMove={event => onMouseMove(feature, event)}
                onMouseLeave={event => onMouseLeave(feature, event)}
                onClick={event => onClick(feature, event)}
            />
        )
    }
)

GeoMapFeature.propTypes = {
    feature: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['Feature']).isRequired,
        properties: PropTypes.object,
        geometry: PropTypes.object.isRequired,
    }).isRequired,
    path: PropTypes.func.isRequired,

    fillColor: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

GeoMapFeature.displayName = 'GeoMapFeature'

export default GeoMapFeature
