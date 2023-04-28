import { Box, BoxAlign, CompleteTheme, Dimensions, Theme, ValueFormat } from '@nivo/core'
import { LegendProps } from '@nivo/legends'

export type BBox = Record<'x' | 'y' | 'height' | 'width', number>

type Legend = Record<'x' | 'y' | 'rotation', number>

export type Month = {
    path: string
    bbox: BBox
    date: Date
    year: number
    month: number
}

export type MonthLegend = Omit<Month, 'path'> & Legend

export type Year = {
    year: number
    bbox: BBox
}

export type YearLegend = Year & Legend

export type DateOrString = string | Date

export type CalendarDatum = {
    day: string
    value: number
}

export type CalendarData = {
    from: DateOrString
    to: DateOrString
    data: CalendarDatum[]
}

export type CalendarDayData = {
    date: Date
    day: string
    value?: number
    color: string
    size: number
    x: number
    y: number
}

export type CalendarLegendProps = LegendProps & {
    itemCount: number
}

export interface ColorScale {
    (value: number | { valueOf(): number }): string
    ticks(count?: number): number[]
}

export type CalendarYearLegendsProps = {
    legend: (year: number) => string | number
    theme: CompleteTheme
    years: YearLegend[]
}

export type CalendarMonthLegendsProps = {
    legend: (year: number, month: number, date: Date) => string | number
    months: MonthLegend[]
    theme: CompleteTheme
}

export type CalendarTooltipProps = {
    value: string
    day: string
    color: string
}

export type CalendarMonthPathProps = {
    borderColor: string
    borderWidth: number
    path: string
}

export type Datum = {
    data: {
        date: Date
        day: string
        size: number
        x: number
        y: number
    }
    date: Date
    day: string
    value: number
    color: string
    size: number
    x: number
    y: number
}

export type CalendarDayProps = {
    data: Omit<Datum, 'data' | 'value'> | Datum
    x: number
    y: number
    size: number
    color: string
    borderWidth: number
    borderColor: string
    isInteractive: boolean
    tooltip: React.FC<CalendarTooltipProps>
    formatValue: (value: number) => string
} & Partial<InteractivityProps<Omit<Datum, 'data' | 'value'> | Datum, SVGRectElement>>

type InteractivityProps<DatumProp, ElementType> = Partial<
    Record<
        'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseMove',
        (datum: DatumProp, event: React.MouseEvent<ElementType>) => void
    >
>

export type CommonCalendarProps = {
    minValue: 'auto' | number
    maxValue: 'auto' | number

    direction: 'horizontal' | 'vertical'
    colors: string[]
    colorScale: ColorScale
    margin: Box
    align: BoxAlign

    yearLegend: (year: number) => string | number
    yearSpacing: number
    yearLegendOffset: number
    yearLegendPosition: 'before' | 'after'

    monthSpacing: number
    monthBorderWidth: number
    monthBorderColor: string
    monthLegend: (year: number, month: number, date: Date) => string | number
    monthLegendOffset: number
    monthLegendPosition: 'before' | 'after'

    daySpacing: number
    dayBorderWidth: number
    dayBorderColor: string
    emptyColor: string

    valueFormat: ValueFormat<number>
    legendFormat: ValueFormat<number>

    theme: Theme

    // interactivity
    isInteractive: boolean
    tooltip: React.FC<CalendarTooltipProps>

    legends: CalendarLegendProps[]

    renderWrapper: boolean
}

export type CalendarSvgProps = Dimensions &
    CalendarData &
    Partial<
        CommonCalendarProps &
            InteractivityProps<Omit<Datum, 'data' | 'value'> | Datum, SVGRectElement> & {
                role: string
            }
    >

export type CalendarCanvasProps = Dimensions &
    CalendarData &
    Partial<
        CommonCalendarProps &
            InteractivityProps<Omit<Datum, 'data' | 'value'> | Datum, HTMLCanvasElement> & {
                pixelRatio: number
            }
    >

export type TimeRangeDayData = (Omit<CalendarDatum, 'value'> | CalendarDatum) & {
    coordinates: {
        x: number
        y: number
    }
    date: Date
    firstWeek: number
    month: number
    year: number
    color: string
    width: number
    height: number
}

export type TimeRangeTooltipProps = Omit<TimeRangeDayData, 'date' | 'value'> & {
    value: string
}

export type Weekday =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'

export type TimeRangeSvgProps = Dimensions & { data: CalendarDatum[] } & Partial<
        Omit<CalendarData, 'data'>
    > &
    Partial<
        Omit<
            CommonCalendarProps,
            | 'yearLegend'
            | 'yearSpacing'
            | 'yearLegendOffset'
            | 'yearLegendPosition'
            | 'monthSpacing'
            | 'monthBorderWidth'
            | 'monthBorderColor'
        > &
            InteractivityProps<TimeRangeDayData, SVGRectElement> & {
                dayRadius: number
                square: boolean
                role: string
                weekdayLegendOffset: number
                weekdayTicks: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>
                firstWeekday: Weekday
            }
    >

export type TimeRangeDayProps = Record<
    'x' | 'y' | 'borderWidth' | 'rx' | 'ry' | 'height' | 'width',
    number
> & {
    data: TimeRangeDayData
    color: string
    borderColor: string
    isInteractive: boolean
    tooltip: React.FC<TimeRangeTooltipProps>
    formatValue: (value: number) => string
} & Partial<InteractivityProps<TimeRangeDayData, SVGRectElement>>
