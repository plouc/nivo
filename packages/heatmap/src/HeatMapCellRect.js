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
import { useSpring, animated } from 'react-spring'
import { useMotionConfig, useTheme } from '@nivo/core'

const HeatMapCellRect = ({
    data,
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    enableLabel,
    textColor,
    onHover,
    onLeave,
    onClick,
}) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: `translate(${x}, ${y})`,
        width,
        height,
        xOffset: width * -0.5,
        yOffset: height * -0.5,
        color,
        opacity,
        textColor,
        borderWidth,
        borderColor,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.g
            transform={animatedProps.transform}
            style={{ cursor: 'pointer' }}
            onMouseEnter={onHover}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            onClick={onClick ? event => onClick(data, event) : undefined}
        >
            <animated.rect
                x={animatedProps.xOffset}
                y={animatedProps.yOffset}
                width={animatedProps.width}
                height={animatedProps.height}
                fill={animatedProps.color}
                fillOpacity={animatedProps.opacity}
                strokeWidth={animatedProps.borderWidth}
                stroke={animatedProps.borderColor}
                strokeOpacity={animatedProps.opacity}
            />
            {enableLabel && (
                <animated.text
                    dominantBaseline="central"
                    textAnchor="middle"
                    style={{
                        ...theme.labels.text,
                        fill: animatedProps.textColor,
                    }}
                    fillOpacity={animatedProps.opacity}
                >
                    {value}
                </animated.text>
            )}
        </animated.g>
    )
}

HeatMapCellRect.propTypes = {
    data: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    textColor: PropTypes.string.isRequired,
    onHover: PropTypes.func,
    onLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default memo(HeatMapCellRect)
