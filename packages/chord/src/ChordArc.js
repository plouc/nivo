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
import { useTooltip } from '@nivo/core'

const ChordArc = memo(
    ({
        arc,
        startAngle,
        endAngle,
        borderWidth,
        getBorderColor,
        opacity,
        arcGenerator,
        setCurrent,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }) => {
        const [showTooltip, hideTooltip] = useTooltip()

        const handleMouseEnter = useMemo(() => {
            if (!isInteractive) return undefined
            return event => {
                setCurrent(arc)
                showTooltip(React.createElement(tooltip, { arc }), event)
                onMouseEnter && onMouseEnter(arc, event)
            }
        }, [isInteractive, arc, onMouseEnter])
        const handleMouseMove = useMemo(() => {
            if (!isInteractive) return undefined
            return event => {
                showTooltip(React.createElement(tooltip, { arc }), event)
                onMouseMove && onMouseMove(arc, event)
            }
        }, [isInteractive, arc, onMouseMove])
        const handleMouseLeave = useMemo(() => {
            if (!isInteractive) return undefined
            return event => {
                setCurrent(null)
                hideTooltip()
                onMouseLeave && onMouseLeave(arc, event)
            }
        }, [isInteractive, arc, onMouseLeave])
        const handleClick = useMemo(() => {
            if (!isInteractive || !onClick) return undefined
            return event => onClick(arc, event)
        }, [isInteractive, arc, onClick])

        return (
            <path
                d={arcGenerator({ startAngle, endAngle })}
                fill={arc.color}
                fillOpacity={opacity}
                strokeWidth={borderWidth}
                stroke={getBorderColor(arc)}
                strokeOpacity={opacity}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)

ChordArc.displayName = 'ChordArc'
ChordArc.propTypes = {
    arc: PropTypes.object.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    arcGenerator: PropTypes.func.isRequired,
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

export default ChordArc
