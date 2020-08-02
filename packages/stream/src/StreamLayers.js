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
import StreamLayer from './StreamLayer'

const StreamLayers = ({
    layers,
    fillOpacity,
    borderWidth,
    getBorderColor,
    getTooltipLabel,
    isInteractive,
}) => {
    return (
        <g>
            {layers.map((layer, i) => (
                <StreamLayer
                    key={i}
                    layer={layer}
                    getBorderColor={getBorderColor}
                    borderWidth={borderWidth}
                    fillOpacity={fillOpacity}
                    getTooltipLabel={getTooltipLabel}
                    isInteractive={isInteractive}
                />
            ))}
        </g>
    )
}

StreamLayers.propTypes = {
    layers: PropTypes.array.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
}

export default StreamLayers
