/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions, Theme, Box, BoxAlign } from '@nivo/core'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/calendar' {
    export type DateOrString = string | Date

    export interface CalendarDatum {
        day: string
        value: number
    }

    export interface CalendarData {
        from: DateOrString
        to: DateOrString
        data: CalendarDatum[]
    }

    type ValueFormatter = (
        datum: Omit<CalendarDayData, 'formattedValue' | 'label'>
    ) => string | number

    export type CalendarDirection = 'horizontal' | 'vertical'

    export type CalendarLegend = LegendProps & {
        itemCount: number
    }

    export type CalendarMouseHandler = (data: CalendarDayData, event: React.MouseEvent<any>) => void

    export interface CalendarDayData {
        date: Date
        day: string
        value?: number
        color: string
        size: number
        x: number
        y: number
    }

    export interface ColorScale {
        (value: number | { valueOf(): number }): Range
        ticks(count?: number): number[]
    }

    export type CalendarCommonProps = Partial<{
        minValue: 'auto' | number
        maxValue: 'auto' | number

        direction: CalendarDirection
        colors: string[]
        colorScale: ColorScale
        margin: Box
        align: BoxAlign

        yearLegend: (year: number) => string | number
        yearSpacing: number
        yearLegendOffset: number
        yearLegendPosition: 'before' | 'after'

        monthLegend: (year: number, month: number, date: Date) => string | number
        monthSpacing: number
        monthBorderWidth: number
        monthBorderColor: string
        monthLegendOffset: number
        monthLegendPosition: 'before' | 'after'

        daySpacing: number
        dayBorderWidth: number
        dayBorderColor: string
        emptyColor: string

        isInteractive: boolean

        onClick?: CalendarMouseHandler
        onMouseMove?: CalendarMouseHandler
        onMouseLeave?: CalendarMouseHandler
        onMouseEnter?: CalendarMouseHandler

        tooltip: React.StatelessComponent<CalendarDayData>

        valueFormat?: string | ValueFormatter
        legendFormat?: string | ValueFormatter

        legends: CalendarLegend[]

        theme: Theme
    }>

    export type CalendarSvgProps = CalendarData &
        CalendarCommonProps &
        Partial<{
            onClick: (datum: CalendarDayData, event: React.MouseEvent<SVGRectElement>) => void
        }>

    export class Calendar extends React.Component<CalendarSvgProps & Dimensions> {}
    export class ResponsiveCalendar extends React.Component<CalendarSvgProps> {}
    export class CalendarCanvas extends React.Component<CalendarSvgProps & Dimensions> {}
    export class ResponsiveCalendarCanvas extends React.Component<CalendarSvgProps> {}
}
