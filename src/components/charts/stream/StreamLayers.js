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
import { motionPropTypes } from '../../../props'
import SmartMotion from '../../SmartMotion'
import BasicTooltip from '../../tooltip/BasicTooltip'

const StreamLayers = ({
    layers,
    fillOpacity,

    showTooltip,
    hideTooltip,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {layers.map(({ id, path, color }, i) => {
                    const handleTooltip = e =>
                        showTooltip(<BasicTooltip id={id} enableChip={true} color={color} />, e)
                    return (
                        <path
                            key={i}
                            onMouseMove={handleTooltip}
                            onMouseEnter={handleTooltip}
                            onMouseLeave={hideTooltip}
                            d={path}
                            fill={color}
                            fillOpacity={fillOpacity}
                        />
                    )
                })}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {layers.map(({ id, path, color }, i) => {
                const handleTooltip = e =>
                    showTooltip(<BasicTooltip id={id} enableChip={true} color={color} />, e)
                return (
                    <SmartMotion
                        key={i}
                        style={spring => ({
                            d: spring(path, springConfig),
                            fill: spring(color, springConfig),
                            fillOpacity: spring(fillOpacity, springConfig),
                        })}
                    >
                        {style =>
                            <path
                                onMouseMove={handleTooltip}
                                onMouseEnter={handleTooltip}
                                onMouseLeave={hideTooltip}
                                {...style}
                            />}
                    </SmartMotion>
                )
            })}
        </g>
    )
}

StreamLayers.propTypes = {
    fillOpacity: PropTypes.number.isRequired,

    // motion
    ...motionPropTypes,
}

export default StreamLayers
