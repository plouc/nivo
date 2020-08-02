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
import { useTransition, animated } from 'react-spring'
import { useMotionConfig } from '@nivo/core'

const ParallelCoordinatesAxisDensityCircles = ({ axis, variable, variablesScale }) => {
    const otherPosition = variablesScale(variable.key)

    const { animate, config: springConfig } = useMotionConfig()
    const transitions = useTransition(variable.densityBins, bin => bin.id, {
        enter: bin => ({
            radius: 0,
            x: axis === 'y' ? otherPosition : bin.position,
            y: axis === 'y' ? bin.position : otherPosition,
        }),
        update: bin => ({
            radius: bin.size / 2,
            x: axis === 'y' ? otherPosition : bin.position,
            y: axis === 'y' ? bin.position : otherPosition,
        }),
        leave: { radius: 0 },
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g>
            {transitions.map(({ props: animatedProps, key }) => (
                <animated.circle
                    key={key}
                    r={animatedProps.radius}
                    cx={animatedProps.x}
                    cy={animatedProps.y}
                    fill="rgba(255,0,0,.1)"
                />
            ))}
        </g>
    )
}

ParallelCoordinatesAxisDensityCircles.propTypes = {
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    variable: PropTypes.shape({
        key: PropTypes.string.isRequired,
        densityBins: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                size: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
    variablesScale: PropTypes.func.isRequired,
}

export default memo(ParallelCoordinatesAxisDensityCircles)
