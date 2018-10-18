import * as React from 'react'
import { Dimensions, Theme, Box } from '@nivo/core'
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

    export type CalendarDirection = 'horizontal' | 'vertical'

    export type CalendarLegend = LegendProps & {
        itemCount: number
    }

    export interface CalendarDayData {
        date: Date
        day: string
        value?: number
        color: string
        size: number
        x: number
        y: number
    }

    export type CalendarCommonProps = Partial<{
        domain: 'auto' | number[]
        direction: CalendarDirection
        colors: string[]
        margin: Box

        // years
        yearLegend: (year: number) => string | number
        yearSpacing: number
        yearLegendOffset: number

        // months
        monthLegend: (year: number, month: number, date: Date) => string | number
        monthBorderWidth: number
        monthBorderColor: string
        monthLegendOffset: number

        // days
        daySpacing: number
        dayBorderWidth: number
        dayBorderColor: string
        emptyColor: string

        // interactivity
        isInteractive: boolean

        // tooltip
        tooltipFormat: (value: number) => string | number
        tooltip: React.StatelessComponent<CalendarDayData>

        // legends
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
}
