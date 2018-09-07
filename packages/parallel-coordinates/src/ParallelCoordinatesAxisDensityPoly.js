/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { motionPropTypes, curveFromProp, SmartMotion } from '@nivo/core'
import { line } from 'd3-shape'

const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveFromProp('catmullRomClosed'))

export default class ParallelCoordinatesAxisDensityPoly extends PureComponent {
    static propTypes = {
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
        ...motionPropTypes,
    }

    render() {
        const {
            axis,
            variable,
            variablesScale,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        if (variable.densityBins.length === 0) return null

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

        if (animate !== true) {
            return (
                <path
                    d={lineGenerator(points)}
                    fill="rgba(0,0,0,.06)"
                    stroke="rgba(0,0,0,.3)"
                    strokeWidth={1}
                />
            )
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <SmartMotion
                style={spring => ({
                    d: spring(lineGenerator(points), springConfig),
                })}
            >
                {style => (
                    <path
                        d={style.d}
                        fill="rgba(0,0,0,.06)"
                        stroke="rgba(0,0,0,.3)"
                        strokeWidth={1}
                    />
                )}
            </SmartMotion>
        )
    }
}
