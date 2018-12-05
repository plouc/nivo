/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { compose, defaultProps, withPropsOnChange, pure, setDisplayName } from 'recompose'
import { scaleLinear } from 'd3-scale'
import { arc } from 'd3-shape'
import { withTheme, withColors, withDimensions, withMotion, getAccessorFor } from '@nivo/core'
import { RoseDefaultProps } from './props'
import { RoseOuterProps, RoseProps } from './definitions'

const commonEnhancers = [
    defaultProps(RoseDefaultProps),
    withTheme(),
    withColors({
        defaultColorBy: RoseDefaultProps.colorBy,
    }),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['width', 'height'], ({ width, height }) => {
        const radius = Math.min(width, height) / 2

        return { radius, centerX: width / 2, centerY: height / 2 }
    }),
    withPropsOnChange(['indexBy'], ({ indexBy }) => ({
        getIndex: getAccessorFor(indexBy),
    })),
    withPropsOnChange(
        ['data', 'keys', 'getIndex', 'innerRadius', 'radius', 'maxValue'],
        ({ data, keys, getIndex, innerRadius: _innerRadius, radius, maxValue: _maxValue }) => {
            let arcs = []
            data.forEach((d, index) => {
                const indexId = getIndex(d)

                let indexArcs = []
                keys.forEach(key => {
                    if (d[key] === undefined) return

                    const arc = {
                        id: `${indexId}.${key}`,
                        index,
                        indexId,
                        serieId: key,
                        value: d[key],
                    }

                    indexArcs.push(arc)
                })

                let previousValue = 0
                indexArcs = indexArcs.map((arc, i) => {
                    const v0 = previousValue
                    const v1 = v0 + arc.value
                    previousValue = v1

                    return {
                        ...arc,
                        v0,
                        v1,
                    }
                })

                arcs = [...arcs, ...indexArcs]
            })

            const angleStep = (Math.PI * 2) / data.length
            const angleScale = scaleLinear()
                .domain([0, data.length])
                .range([Math.PI, 3 * Math.PI])

            const maxValue = _maxValue !== 'auto' ? _maxValue : Math.max(...arcs.map(a => a.v1))
            const innerRadius = radius * _innerRadius
            const radiusScale = scaleLinear()
                .domain([0, maxValue])
                .range([innerRadius, radius])

            arcs = arcs.map(arc => {
                const startAngle = angleScale(arc.index)
                const endAngle = angleScale(arc.index) + angleStep
                const totalAngle = endAngle - startAngle
                const midAngle = startAngle + totalAngle * 0.5

                return {
                    ...arc,
                    startAngle,
                    midAngle,
                    endAngle,
                    innerRadius: radiusScale(arc.v0),
                    outerRadius: radiusScale(arc.v1),
                }
            })

            return {
                arcs,
                angleStep,
                angleScale,
                radiusScale,
            }
        }
    ),
    withPropsOnChange(['arcs', 'getColor'], ({ arcs, getColor }) => {
        return {
            arcs: arcs.map(arc => {
                return {
                    ...arc,
                    color: getColor(arc),
                }
            }),
        }
    }),
    withPropsOnChange(['cornerRadius'], ({ cornerRadius }) => ({
        arcGenerator: arc().cornerRadius(cornerRadius),
    })),
]

export const enhanceSvg = <Datum>(Component): any =>
    compose<RoseOuterProps<Datum>, RoseProps<Datum>>(
        ...commonEnhancers,
        pure,
        setDisplayName('Rose')
    )(Component)

export const enhanceCanvas = <Datum>(Component): any =>
    compose<RoseOuterProps<Datum>, RoseProps<Datum>>(
        ...commonEnhancers,
        pure,
        setDisplayName('RoseCanvas')
    )(Component)
