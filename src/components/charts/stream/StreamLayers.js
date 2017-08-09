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

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {layers.map(({ path, color }, i) => <path key={i} d={path} fill={color} />)}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {layers.map(({ path, color }, i) =>
                <SmartMotion
                    key={i}
                    style={spring => ({
                        d: spring(path, springConfig),
                        fill: spring(color, springConfig),
                    })}
                >
                    {style => <path {...style} />}
                </SmartMotion>
            )}
        </g>
    )
}

StreamLayers.propTypes = {
    area: PropTypes.func.isRequired,

    // motion
    ...motionPropTypes,
}

export default StreamLayers
