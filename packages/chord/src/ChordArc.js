/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'
import { useTooltip } from '@nivo/tooltip'

const ChordArc = ({
    arc,
    animatedProps,
    borderWidth,
    getBorderColor,
    setCurrent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined
        return event => {
            setCurrent(arc)
            showTooltipFromEvent(React.createElement(tooltip, { arc }), event)
            onMouseEnter && onMouseEnter(arc, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, arc, onMouseEnter])
    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined
        return event => {
            showTooltipFromEvent(React.createElement(tooltip, { arc }), event)
            onMouseMove && onMouseMove(arc, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, arc, onMouseMove])
    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined
        return event => {
            setCurrent(null)
            hideTooltip()
            onMouseLeave && onMouseLeave(arc, event)
        }
    }, [isInteractive, hideTooltip, arc, onMouseLeave])
    const handleClick = useMemo(() => {
        if (!isInteractive || !onClick) return undefined
        return event => onClick(arc, event)
    }, [isInteractive, arc, onClick])

    return (
        <animated.path
            d={animatedProps.path}
            fill={animatedProps.color}
            fillOpacity={animatedProps.opacity}
            strokeWidth={borderWidth}
            stroke={getBorderColor(arc)}
            strokeOpacity={animatedProps.opacity}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    )
}

ChordArc.displayName = 'ChordArc'
ChordArc.propTypes = {
    arc: PropTypes.object.isRequired,
    animatedProps: PropTypes.object.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    opacity: PropTypes.number.isRequired,
    setCurrent: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default memo(ChordArc)
