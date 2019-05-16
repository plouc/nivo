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
import { SmartMotion, useMotionConfig } from '@nivo/core'

const AnimatedLine = ({
    serie,
    lineGenerator,
    yStep,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const { springConfig } = useMotionConfig()

    const path = useMemo(() => lineGenerator(serie.linePoints), [lineGenerator, serie.linePoints])

    return (
        <SmartMotion
            style={spring => ({
                d: spring(path, springConfig),
                stroke: spring(serie.color, springConfig),
                opacity: spring(serie.style.opacity, springConfig),
                strokeWidth: spring(serie.style.lineWidth, springConfig),
            })}
        >
            {interpolated => (
                <>
                    <path
                        fill="none"
                        d={interpolated.d}
                        stroke={interpolated.stroke}
                        strokeWidth={interpolated.strokeWidth}
                        strokeLinecap="round"
                        strokeOpacity={interpolated.opacity}
                        style={{ pointerEvents: 'none' }}
                    />
                    {isInteractive && (
                        <path
                            fill="none"
                            stroke="red"
                            strokeOpacity={0}
                            strokeWidth={yStep}
                            d={path}
                            strokeLinecap="butt"
                            onMouseEnter={onMouseEnter}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            onClick={onClick}
                        />
                    )}
                </>
            )}
        </SmartMotion>
    )
}

AnimatedLine.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.shape({
            lineWidth: PropTypes.number.isRequired,
            opacity: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    lineGenerator: PropTypes.func.isRequired,
    yStep: PropTypes.number.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default memo(AnimatedLine)
