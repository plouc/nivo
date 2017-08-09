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
                {layers.map(({ id, path, color }, i) =>
                    <path
                        key={i}
                        onMouseMove={e => {
                            showTooltip(id, e)
                        }}
                        onMouseEnter={e => {
                            showTooltip(id, e)
                        }}
                        onMouseLeave={hideTooltip}
                        d={path}
                        fill={color}
                        fillOpacity={fillOpacity}
                    />
                )}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {layers.map(({ id, path, color }, i) =>
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
                            onMouseMove={e => {
                                showTooltip(id, e)
                            }}
                            onMouseEnter={e => {
                                showTooltip(id, e)
                            }}
                            onMouseLeave={hideTooltip}
                            {...style}
                        />}
                </SmartMotion>
            )}
        </g>
    )
}

StreamLayers.propTypes = {
    area: PropTypes.func.isRequired,
    fillOpacity: PropTypes.number.isRequired,

    // motion
    ...motionPropTypes,
}

export default StreamLayers
