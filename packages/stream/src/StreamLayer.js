/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { BasicTooltip, useTooltip } from '@nivo/tooltip'

const StreamLayer = ({
    layer,
    fillOpacity,
    borderWidth,
    getBorderColor,
    getTooltipLabel,
    isInteractive,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseHover = useCallback(
        event => {
            showTooltipFromEvent(
                <BasicTooltip id={getTooltipLabel(layer)} enableChip={true} color={layer.color} />,
                event,
                'left'
            )
        },
        [showTooltipFromEvent, getTooltipLabel, layer]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        path: layer.path,
        color: layer.color,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedProps.path}
            fill={layer.fill ? layer.fill : animatedProps.color}
            fillOpacity={fillOpacity}
            stroke={getBorderColor(layer)}
            strokeWidth={borderWidth}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? hideTooltip : undefined}
        />
    )
}

StreamLayer.propTypes = {
    layer: PropTypes.object.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
}

export default memo(StreamLayer)
