/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { compose, defaultProps, withPropsOnChange, pure } from 'recompose'
import { scaleQuantize } from 'd3-scale'
import { withTheme, withDimensions } from '@nivo/core'
import { CalendarDefaultProps, CalendarCanvasDefaultProps } from './props'
import {
    computeDomain,
    computeLayout,
    bindDaysData,
    computeYearLegendPositions,
    computeMonthLegendPositions,
} from './compute'

const commonEnhancers = [
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
        ['years', 'direction', 'yearLegendPosition', 'yearLegendOffset'],
        ({ years, direction, yearLegendPosition, yearLegendOffset }) => {
            return {
                yearLegends: computeYearLegendPositions({
                    years,
                    direction,
                    position: yearLegendPosition,
                    offset: yearLegendOffset,
                }),
            }
        }
    ),
    withPropsOnChange(
        ['months', 'direction', 'monthLegendPosition', 'monthLegendOffset'],
        ({ months, direction, monthLegendPosition, monthLegendOffset }) => {
            return {
                monthLegends: computeMonthLegendPositions({
                    months,
                    direction,
                    position: monthLegendPosition,
                    offset: monthLegendOffset,
                }),
            }
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
]

export default Component => {
    switch (Component.displayName) {
        case 'Calendar':
            return compose(...[defaultProps(CalendarDefaultProps), ...commonEnhancers, pure])(
                Component
            )

        case 'CalendarCanvas':
            return compose(...[defaultProps(CalendarCanvasDefaultProps), ...commonEnhancers, pure])(
                Component
            )
    }

    return Component
}
