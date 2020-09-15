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
import { blendModePropType } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'

const ChordRibbon = ({
    ribbon,
    animatedProps,
    color,
    borderWidth,
    getBorderColor,
    blendMode,
    isInteractive,
    setCurrent,
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
            setCurrent(ribbon)
            showTooltipFromEvent(React.createElement(tooltip, { ribbon }), event)
            onMouseEnter && onMouseEnter(ribbon, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseEnter])
    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined
        return event => {
            showTooltipFromEvent(React.createElement(tooltip, { ribbon }), event)
            onMouseMove && onMouseMove(ribbon, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseMove])
    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined
        return event => {
            setCurrent(null)
            hideTooltip()
            onMouseLeave && onMouseLeave(ribbon, event)
        }
    }, [isInteractive, hideTooltip, ribbon, onMouseLeave])
    const handleClick = useMemo(() => {
        if (!isInteractive || !onClick) return undefined
        return event => onClick(ribbon, event)
    }, [isInteractive, ribbon, onClick])

    return (
        <animated.path
            d={animatedProps.path}
            fill={animatedProps.color}
            fillOpacity={animatedProps.opacity}
            strokeWidth={borderWidth}
            stroke={getBorderColor({ ...ribbon, color })}
            strokeOpacity={animatedProps.opacity}
            style={{ mixBlendMode: blendMode }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    )
}

ChordRibbon.displayName = 'ChordRibbon'
ChordRibbon.propTypes = {
    ribbon: PropTypes.object.isRequired,
    animatedProps: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    blendMode: blendModePropType.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default memo(ChordRibbon)
