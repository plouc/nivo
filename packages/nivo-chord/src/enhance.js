/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { arc as d3Arc } from 'd3-shape'
import { chord as d3Chord, ribbon as d3Ribbon } from 'd3-chord'
import { getInheritedColorGenerator, getColorRange } from '@nivo/core'
import { getLabelGenerator } from '@nivo/core'
import { withMotion, withTheme, withDimensions } from '@nivo/core'
import { ChordDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(ChordDefaultProps),
        withState('currentArc', 'setCurrentArc', null),
        withState('currentRibbon', 'setCurrentRibbon', null),
        withMotion(),
        withTheme(),
        withDimensions(),
        withPropsOnChange(['label'], ({ label }) => ({
            getLabel: getLabelGenerator(label),
        })),
        withPropsOnChange(['padAngle'], ({ padAngle }) => ({
            chord: d3Chord().padAngle(padAngle),
        })),
        withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor, 'labels.textColor'),
        })),
        withPropsOnChange(['colors', 'keys'], ({ colors, keys }) => {
            const color = getColorRange(colors)

            return {
                colorById: keys.reduce((acc, key) => {
                    acc[key] = color(key)
                    return acc
                }, {}),
            }
        }),
        withPropsOnChange(
            ['width', 'height', 'innerRadiusRatio', 'innerRadiusOffset'],
            ({ width, height, innerRadiusRatio, innerRadiusOffset }) => {
                const radius = Math.min(width, height) / 2
                const innerRadius = radius * innerRadiusRatio
                const ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

                const arcGenerator = d3Arc()
                    .outerRadius(radius)
                    .innerRadius(innerRadius)
                const ribbonGenerator = d3Ribbon().radius(ribbonRadius)

                return { radius, innerRadius, arcGenerator, ribbonGenerator }
            }
        ),
        withPropsOnChange(['arcOpacity', 'ribbonOpacity'], ({ arcOpacity, ribbonOpacity }) => ({
            getArcOpacity: () => arcOpacity,
            getRibbonOpacity: () => ribbonOpacity,
        })),
        withPropsOnChange(
            [
                'isInteractive',
                'currentArc',
                'arcHoverOpacity',
                'arcHoverOthersOpacity',
                'currentRibbon',
                'ribbonHoverOpacity',
                'ribbonHoverOthersOpacity',
            ],
            ({
                isInteractive,
                currentArc,
                arcHoverOpacity,
                arcHoverOthersOpacity,
                currentRibbon,
                ribbonHoverOpacity,
                ribbonHoverOthersOpacity,
            }) => {
                if (!isInteractive || (!currentArc && !currentRibbon)) return null

                let getArcOpacity
                let getRibbonOpacity
                if (isInteractive) {
                    if (currentArc) {
                        getArcOpacity = arc => {
                            if (arc.id === currentArc.id) return arcHoverOpacity
                            return arcHoverOthersOpacity
                        }
                        getRibbonOpacity = ribbon => {
                            if (
                                ribbon.source.id === currentArc.id ||
                                ribbon.target.id === currentArc.id
                            )
                                return ribbonHoverOpacity
                            return ribbonHoverOthersOpacity
                        }
                    } else if (currentRibbon) {
                        getArcOpacity = arc => {
                            if (
                                arc.id === currentRibbon.source.id ||
                                arc.id === currentRibbon.target.id
                            )
                                return arcHoverOpacity
                            return arcHoverOthersOpacity
                        }
                        getRibbonOpacity = ribbon => {
                            if (
                                ribbon.source.id === currentRibbon.source.id &&
                                ribbon.target.id === currentRibbon.target.id
                            )
                                return ribbonHoverOpacity
                            return ribbonHoverOthersOpacity
                        }
                    }
                }

                return { getArcOpacity, getRibbonOpacity }
            }
        ),
        withPropsOnChange(
            ['chord', 'colorById', 'matrix', 'keys'],
            ({ chord, colorById, matrix, keys }) => {
                const ribbons = chord(matrix)
                ribbons.forEach(ribbon => {
                    ribbon.source.id = keys[ribbon.source.index]
                    ribbon.source.color = colorById[ribbon.source.id]
                    ribbon.target.id = keys[ribbon.target.index]
                    ribbon.target.color = colorById[ribbon.target.id]
                    const ribbonKeys = [ribbon.source.id, ribbon.target.id]
                    ribbonKeys.sort()
                    ribbon.key = ribbonKeys.sort().join('.')
                })

                const arcs = ribbons.groups.map(arc => {
                    arc.key = arc.id = keys[arc.index]
                    arc.color = colorById[arc.id]
                    return arc
                })

                return { ribbons, arcs }
            }
        ),
        withPropsOnChange(['arcBorderColor'], ({ arcBorderColor }) => ({
            getArcBorderColor: getInheritedColorGenerator(arcBorderColor),
        })),
        withPropsOnChange(['ribbonBorderColor'], ({ ribbonBorderColor }) => ({
            getRibbonBorderColor: getInheritedColorGenerator(ribbonBorderColor),
        })),
        pure
    )(Component)
