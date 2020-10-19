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
import { useMotionConfig } from '@nivo/core'
import { useSerieHandlers } from './hooks'

const Line = ({
    serie,
    lineGenerator,
    yStep,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrentSerie,
    tooltip,
}) => {
    const handlers = useSerieHandlers({
        serie,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setCurrent: setCurrentSerie,
        tooltip,
    })

    const { animate, config: springConfig } = useMotionConfig()

    const linePath = lineGenerator(serie.linePoints)

    const animatedProps = useSpring({
        path: linePath,
        color: serie.color,
        opacity: serie.style.opacity,
        lineWidth: serie.style.lineWidth,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            <animated.path
                fill="none"
                d={animatedProps.path}
                stroke={animatedProps.color}
                strokeWidth={animatedProps.lineWidth}
                strokeLinecap="round"
                strokeOpacity={animatedProps.opacity}
                style={{ pointerEvents: 'none' }}
            />
            {isInteractive && (
                <path
                    fill="none"
                    stroke="red"
                    strokeOpacity={0}
                    strokeWidth={yStep}
                    d={linePath}
                    strokeLinecap="butt"
                    onMouseEnter={handlers.onMouseEnter}
                    onMouseMove={handlers.onMouseMove}
                    onMouseLeave={handlers.onMouseLeave}
                    onClick={handlers.onClick}
                />
            )}
        </>
    )
}

Line.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        linePoints: PropTypes.array.isRequired,
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
    setCurrentSerie: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default memo(Line)
