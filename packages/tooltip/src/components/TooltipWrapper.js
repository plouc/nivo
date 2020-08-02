/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig, useMeasure } from '@nivo/core'

const TOOLTIP_OFFSET = 14

const tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
}

const TooltipWrapper = ({ position, anchor, children }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()
    const [measureRef, bounds] = useMeasure()
    const previousPosition = useRef(false)

    let to = undefined
    let immediate = false

    const hasDimension = bounds.width > 0 && bounds.height > 0
    if (hasDimension) {
        let x = Math.round(position[0])
        let y = Math.round(position[1])

        if (anchor === 'top') {
            x -= bounds.width / 2
            y -= bounds.height + TOOLTIP_OFFSET
        } else if (anchor === 'right') {
            x += TOOLTIP_OFFSET
            y -= bounds.height / 2
        } else if (anchor === 'bottom') {
            x -= bounds.width / 2
            y += TOOLTIP_OFFSET
        } else if (anchor === 'left') {
            x -= bounds.width + TOOLTIP_OFFSET
            y -= bounds.height / 2
        } else if (anchor === 'center') {
            x -= bounds.width / 2
            y -= bounds.height / 2
        }

        to = {
            transform: `translate(${x}px, ${y}px)`,
        }
        if (!previousPosition.current) {
            immediate = true
        }

        previousPosition.current = [x, y]
    }

    const animatedProps = useSpring({
        to,
        config: springConfig,
        immediate: !animate || immediate,
    })

    const style = {
        ...tooltipStyle,
        ...theme.tooltip,
        transform: animatedProps.transform,
        opacity: animatedProps.transform ? 1 : 0,
    }

    return (
        <animated.div ref={measureRef} style={style}>
            {children}
        </animated.div>
    )
}

TooltipWrapper.propTypes = {
    position: PropTypes.array.isRequired,
    anchor: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']).isRequired,
    children: PropTypes.node.isRequired,
}
TooltipWrapper.defaultProps = {
    anchor: 'top',
}

export default memo(TooltipWrapper)
