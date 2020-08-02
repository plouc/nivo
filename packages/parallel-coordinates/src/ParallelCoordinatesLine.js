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
import { useTooltip } from '@nivo/tooltip'
import ParallelCoordinatesLineTooltip from './ParallelCoordinatesLineTooltip'

const ParallelCoordinatesLine = ({
    data,
    variables,
    lineGenerator,
    points,
    strokeWidth,
    color,
    opacity,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseHover = useCallback(
        event => {
            showTooltipFromEvent(
                <ParallelCoordinatesLineTooltip data={data} variables={variables} />,
                event
            )
        },
        [data, variables]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        path: lineGenerator(points),
        color,
        opacity,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedProps.path}
            stroke={animatedProps.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={animatedProps.opacity}
            fill="none"
            onMouseEnter={handleMouseHover}
            onMouseMove={handleMouseHover}
            onMouseLeave={hideTooltip}
        />
    )
}

ParallelCoordinatesLine.propTypes = {
    data: PropTypes.object.isRequired,
    variables: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    lineGenerator: PropTypes.func.isRequired,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
    strokeWidth: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
}

export default memo(ParallelCoordinatesLine)
