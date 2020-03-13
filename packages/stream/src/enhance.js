/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'
import { stack as d3Stack, area } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import { format as d3Format } from 'd3-format'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import {
    stackOrderFromProp,
    stackOffsetFromProp,
    withTheme,
    withCurve,
    withDimensions,
    withMotion,
} from '@nivo/core'
import { getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors'
import { StreamDefaultProps } from './props'

const stackMin = layers =>
    Math.min(...layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[0])], []))
const stackMax = layers =>
    Math.max(...layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[1])], []))

export default Component =>
    compose(
        defaultProps(StreamDefaultProps),
        withTheme(),
        withCurve(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['curveInterpolator'], ({ curveInterpolator }) => ({
            areaGenerator: area()
                .x(({ x }) => x)
                .y0(({ y1 }) => y1)
                .y1(({ y2 }) => y2)
                .curve(curveInterpolator),
        })),
        withPropsOnChange(['colors'], ({ colors }) => ({
            getColor: getOrdinalColorScale(colors, 'index'),
        })),
        withPropsOnChange(['borderColor', 'theme'], ({ borderColor, theme }) => ({
            getBorderColor: getInheritedColorGenerator(borderColor, theme),
        })),
        withPropsOnChange(['keys', 'offsetType', 'order'], ({ keys, offsetType, order }) => ({
            stack: d3Stack()
                .keys(keys)
                .offset(stackOffsetFromProp(offsetType))
                .order(stackOrderFromProp(order)),
        })),
        withPropsOnChange(
            ['stack', 'data', 'width', 'height'],
            ({ stack, data, width, height }) => {
                const layers = stack(data)
                layers.forEach(layer => {
                    layer.forEach(point => {
                        point.value = point.data[layer.key]
                    })
                })

                const minValue = stackMin(layers)
                const maxValue = stackMax(layers)

                return {
                    layers,
                    xScale: scalePoint()
                        .domain(range(data.length))
                        .range([0, width]),
                    yScale: scaleLinear()
                        .domain([minValue, maxValue])
                        .range([height, 0]),
                }
            }
        ),
        withPropsOnChange(['dotSize'], ({ dotSize }) => ({
            getDotSize: typeof dotSize === 'function' ? dotSize : () => dotSize,
        })),
        withPropsOnChange(['dotColor', 'theme'], ({ dotColor, theme }) => ({
            getDotColor: getInheritedColorGenerator(dotColor, theme),
        })),
        withPropsOnChange(['dotBorderWidth'], ({ dotBorderWidth }) => ({
            getDotBorderWidth:
                typeof dotBorderWidth === 'function' ? dotBorderWidth : () => dotBorderWidth,
        })),
        withPropsOnChange(['dotBorderColor', 'theme'], ({ dotBorderColor, theme }) => ({
            getDotBorderColor: getInheritedColorGenerator(dotBorderColor, theme),
        })),
        withPropsOnChange(
            ['tooltipTitle', 'tooltipLabel', 'tooltipFormat'],
            ({ tooltipTitle, tooltipLabel, tooltipFormat }) => {
                let getTooltipTitle = d => d.tooltipTitle
                if (typeof tooltipTitle === 'function') {
                    getTooltipTitle = tooltipTitle
                } else if (typeof tooltipTitle === 'string' || tooltipTitle instanceof String) {
                    const formatter = d3Format(tooltipTitle)
                    getTooltipTitle = d => formatter(d.value)
                }

                let getTooltipLabel = d => d.id
                if (typeof tooltipLabel === 'function') {
                    getTooltipLabel = tooltipLabel
                }

                let getTooltipValue = d => d.value
                if (typeof tooltipFormat === 'function') {
                    getTooltipValue = tooltipFormat
                } else if (typeof tooltipFormat === 'string' || tooltipFormat instanceof String) {
                    const formatter = d3Format(tooltipFormat)
                    getTooltipValue = d => formatter(d.value)
                }

                return {
                    getTooltipTitle,
                    getTooltipValue,
                    getTooltipLabel,
                }
            }
        ),
        pure
    )(Component)
