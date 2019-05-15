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
import { blendModePropType, SmartMotion, useMotionConfig } from '@nivo/core'

const AnimatedArea = ({
    serie,
    areaGenerator,
    blendMode,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const { springConfig } = useMotionConfig()

    return (
        <SmartMotion
            style={spring => ({
                d: spring(areaGenerator(serie.areaPoints), springConfig),
                fill: spring(serie.color, springConfig),
                fillOpacity: spring(serie.style.fillOpacity, springConfig),
                stroke: spring(serie.style.borderColor, springConfig),
                strokeOpacity: spring(serie.style.borderOpacity, springConfig),
            })}
        >
            {interpolated => (
                <path
                    d={interpolated.d}
                    fill={interpolated.fill}
                    fillOpacity={interpolated.fillOpacity}
                    stroke={interpolated.stroke}
                    strokeWidth={serie.style.borderWidth}
                    strokeOpacity={interpolated.strokeOpacity}
                    style={{ mixBlendMode: blendMode }}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                />
            )}
        </SmartMotion>
    )
}

AnimatedArea.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.shape({
            fillOpacity: PropTypes.number.isRequired,
            borderWidth: PropTypes.number.isRequired,
            borderColor: PropTypes.string.isRequired,
            borderOpacity: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    areaGenerator: PropTypes.func.isRequired,
    blendMode: blendModePropType.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default memo(AnimatedArea)
