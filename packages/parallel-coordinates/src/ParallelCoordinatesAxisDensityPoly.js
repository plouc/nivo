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
import { line } from 'd3-shape'
import { useSpring, animated } from 'react-spring'
import { curveFromProp, useMotionConfig } from '@nivo/core'

const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveFromProp('catmullRomClosed'))

const ParallelCoordinatesAxisDensityPoly = ({ axis, variable, variablesScale }) => {
    const otherPosition = variablesScale(variable.key)

    const axisValue = (x, y) => (axis === 'x' ? x : y)

    const lastIndex = variable.densityBins.length - 1
    const points = variable.densityBins.reduce((acc, bin, index) => {
        if (index === 0) {
            acc.push({
                x: axisValue(bin.position - bin.size * 0.5, otherPosition),
                y: axisValue(otherPosition, bin.position + bin.size * 0.5),
            })
        }
        acc.push({
            x: axisValue(bin.position, otherPosition + bin.size * 0.5),
            y: axisValue(otherPosition + bin.size * 0.5, bin.position),
        })
        if (index === lastIndex) {
            acc.push({
                x: axisValue(bin.position + bin.size * 0.5, otherPosition),
                y: axisValue(otherPosition, bin.position - bin.size * 0.5),
            })
        }

        return acc
    }, [])

    const reversed = [...variable.densityBins].reverse()
    reversed.forEach(bin => {
        points.push({
            x: axisValue(bin.position, otherPosition - bin.size * 0.5),
            y: axisValue(otherPosition - bin.size * 0.5, bin.position),
        })
    })

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        path: lineGenerator(points),
        config: springConfig,
        immediate: !animate,
    })

    if (variable.densityBins.length === 0) return null

    return (
        <animated.path
            d={animatedProps.path}
            fill="rgba(0,0,0,.06)"
            stroke="rgba(0,0,0,.3)"
            strokeWidth={1}
        />
    )
}

ParallelCoordinatesAxisDensityPoly.propTypes = {
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

export default memo(ParallelCoordinatesAxisDensityPoly)
