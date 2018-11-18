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
import { motionPropTypes } from '@nivo/core'
import { SmartMotion } from '@nivo/core'
import { BasicTooltip } from '@nivo/core'

const StreamLayers = ({
    layers,

    fillOpacity,
    borderWidth,
    getBorderColor,
    theme,

    showTooltip,
    hideTooltip,
    getTooltipLabel,

    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {layers.map((layer, i) => {
                    const { path, color } = layer

                    const handleTooltip = e =>
                        showTooltip(
                            <BasicTooltip
                                id={getTooltipLabel(layer)}
                                enableChip={true}
                                color={color}
                                theme={theme}
                            />,
                            e
                        )

                    return (
                        <path
                            key={i}
                            onMouseMove={handleTooltip}
                            onMouseEnter={handleTooltip}
                            onMouseLeave={hideTooltip}
                            d={path}
                            fill={layer.fill ? layer.fill : layer.color}
                            fillOpacity={fillOpacity}
                            stroke={getBorderColor(layer)}
                            strokeWidth={borderWidth}
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
            {layers.map((layer, i) => {
                const { path, color } = layer

                const handleTooltip = e =>
                    showTooltip(
                        <BasicTooltip
                            id={getTooltipLabel(layer)}
                            enableChip={true}
                            color={color}
                            theme={theme}
                        />,
                        e
                    )

                return (
                    <SmartMotion
                        key={i}
                        style={spring => ({
                            d: spring(path, springConfig),
                            fill: spring(color, springConfig),
                            fillOpacity: spring(fillOpacity, springConfig),
                        })}
                    >
                        {style => (
                            <path
                                onMouseMove={handleTooltip}
                                onMouseEnter={handleTooltip}
                                onMouseLeave={hideTooltip}
                                {...style}
                                fill={layer.fill ? layer.fill : style.fill}
                                stroke={getBorderColor(layer)}
                                strokeWidth={borderWidth}
                            />
                        )}
                    </SmartMotion>
                )
            })}
        </g>
    )
}

StreamLayers.propTypes = {
    fillOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    ...motionPropTypes,
}

export default StreamLayers
