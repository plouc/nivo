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
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { scaleQuantize } from 'd3-scale'
import { withTheme, withDimensions } from '@nivo/core'
import { CalendarDefaultProps } from './props'
import { computeDomain, computeLayout, bindDaysData } from './computeCalendar'

export default Component =>
    compose(
        defaultProps(CalendarDefaultProps),
        withTheme(),
        withDimensions(),
        withPropsOnChange(
            ['data', 'minValue', 'maxValue', 'colors'],
            ({ data, minValue, maxValue, colors }) => {
                const domain = computeDomain(data, minValue, maxValue)

                const colorScale = scaleQuantize()
                    .domain(domain)
                    .range(colors)

                return { colorScale }
            }
        ),
        withPropsOnChange(
            ['width', 'height', 'from', 'to', 'direction', 'yearSpacing', 'daySpacing'],
            ({ width, height, from, to, direction, yearSpacing, daySpacing }) => {
                const { years, months, days } = computeLayout({
                    width,
                    height,
                    from,
                    to,
                    direction,
                    yearSpacing,
                    daySpacing,
                })

                return { years, months, days }
            }
        ),
        withPropsOnChange(
            ['days', 'data', 'colorScale', 'emptyColor'],
            ({ days, data, colorScale, emptyColor }) => {
                return {
                    days: bindDaysData({
                        days,
                        data,
                        colorScale,
                        emptyColor,
                    }),
                }
            }
        ),
        pure
    )(Component)
