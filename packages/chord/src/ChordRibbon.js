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
import { blendModePropType, useTooltip } from '@nivo/core'

const ChordRibbon = memo(
    ({
        ribbon,
        ribbonGenerator,
        sourceStartAngle,
        sourceEndAngle,
        targetStartAngle,
        targetEndAngle,
        color,
        opacity,
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
        const [showTooltip, hideTooltip] = useTooltip()

        const handleMouseEnter = useMemo(() => {
            if (!isInteractive) return undefined
            return event => {
                setCurrent(ribbon)
                showTooltip(React.createElement(tooltip, { ribbon }), event)
                onMouseEnter && onMouseEnter(ribbon, event)
            }
        }, [isInteractive, ribbon, onMouseEnter])
        const handleMouseMove = useMemo(() => {
            if (!isInteractive) return undefined
            return event => {
                showTooltip(React.createElement(tooltip, { ribbon }), event)
                onMouseMove && onMouseMove(ribbon, event)
            }
        }, [isInteractive, ribbon, onMouseMove])
        const handleMouseLeave = useMemo(() => {
            if (!isInteractive) return undefined
            return event => {
                setCurrent(null)
                hideTooltip()
                onMouseLeave && onMouseLeave(ribbon, event)
            }
        }, [isInteractive, ribbon, onMouseLeave])
        const handleClick = useMemo(() => {
            if (!isInteractive || !onClick) return undefined
            return event => onClick(ribbon, event)
        }, [isInteractive, ribbon, onClick])

        return (
            <path
                d={ribbonGenerator({
                    source: {
                        startAngle: sourceStartAngle,
                        endAngle: sourceEndAngle,
                    },
                    target: {
                        startAngle: targetStartAngle,
                        endAngle: targetEndAngle,
                    },
                })}
                fill={color}
                fillOpacity={opacity}
                strokeWidth={borderWidth}
                stroke={getBorderColor({ ...ribbon, color })}
                strokeOpacity={opacity}
                style={{ mixBlendMode: blendMode }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)

ChordRibbon.displayName = 'ChordRibbon'
ChordRibbon.propTypes = {
    ribbon: PropTypes.object.isRequired,
    ribbonGenerator: PropTypes.func.isRequired,
    sourceStartAngle: PropTypes.number.isRequired,
    sourceEndAngle: PropTypes.number.isRequired,
    targetStartAngle: PropTypes.number.isRequired,
    targetEndAngle: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    blendMode: blendModePropType.isRequired,
    opacity: PropTypes.number.isRequired,
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

export default ChordRibbon
