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
import { blendModePropType } from '@nivo/core'

const StaticArea = ({
    serie,
    areaGenerator,
    blendMode,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}) => {
    return (
        <path
            d={areaGenerator(serie.areaPoints)}
            fill={serie.color}
            fillOpacity={serie.style.fillOpacity}
            stroke={serie.color}
            strokeWidth={serie.style.borderWidth}
            strokeOpacity={serie.style.borderOpacity}
            style={{ mixBlendMode: blendMode }}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        />
    )
}

StaticArea.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.shape({
            fillOpacity: PropTypes.number.isRequired,
            borderWidth: PropTypes.number.isRequired,
            borderOpacity: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    areaGenerator: PropTypes.func.isRequired,
    blendMode: blendModePropType.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export default memo(StaticArea)
