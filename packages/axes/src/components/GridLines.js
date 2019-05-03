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
import { TransitionMotion, spring } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'
import GridLine from './GridLine'

const GridLines = memo(({ type, lines }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    const lineWillEnter = useMemo(
        () => ({ style }) => ({
            opacity: 0,
            x1: type === 'x' ? 0 : style.x1.val,
            x2: type === 'x' ? 0 : style.x2.val,
            y1: type === 'y' ? 0 : style.y1.val,
            y2: type === 'y' ? 0 : style.y2.val,
        }),
        [type]
    )

    const lineWillLeave = useMemo(
        () => ({ style }) => ({
            opacity: spring(0, springConfig),
            x1: spring(style.x1.val, springConfig),
            x2: spring(style.x2.val, springConfig),
            y1: spring(style.y1.val, springConfig),
            y2: spring(style.y2.val, springConfig),
        }),
        [springConfig]
    )

    if (!animate) {
        return (
            <g>
                {lines.map(line => (
                    <GridLine key={line.key} {...line} {...theme.grid.line} />
                ))}
            </g>
        )
    }

    return (
        <TransitionMotion
            willEnter={lineWillEnter}
            willLeave={lineWillLeave}
            styles={lines.map(line => {
                return {
                    key: line.key,
                    style: {
                        opacity: spring(1, springConfig),
                        x1: spring(line.x1 || 0, springConfig),
                        x2: spring(line.x2 || 0, springConfig),
                        y1: spring(line.y1 || 0, springConfig),
                        y2: spring(line.y2 || 0, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(interpolatedStyle => {
                        const { key, style } = interpolatedStyle

                        return <GridLine key={key} {...theme.grid.line} {...style} />
                    })}
                </g>
            )}
        </TransitionMotion>
    )
})

GridLines.displayName = 'GridLines'
GridLines.propTypes = {
    type: PropTypes.oneOf(['x', 'y']).isRequired,
    lines: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            x1: PropTypes.number,
            x2: PropTypes.number,
            y1: PropTypes.number,
            y2: PropTypes.number,
        })
    ).isRequired,
}

export default GridLines
