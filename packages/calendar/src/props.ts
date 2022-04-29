import { timeFormat } from 'd3-time-format'
import { CalendarLegendProps } from './types'
import { CalendarTooltip } from './CalendarTooltip'

const monthLabelFormat = timeFormat('%b')
const arrayOfWeekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const commonDefaultProps = {
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'] as string[],

    align: 'center',
    direction: 'horizontal',
    emptyColor: '#fff',

    minValue: 0,
    maxValue: 'auto',

    yearSpacing: 30,
    yearLegend: (year: number) => year,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,

    monthBorderWidth: 2,
    monthBorderColor: '#000',
    monthSpacing: 0,
    monthLegend: (_year: number, _month: number, date: Date) => monthLabelFormat(date),
    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    daySpacing: 0,
    dayBorderWidth: 1,
    dayBorderColor: '#000',

    weekdayLegend: (day: number) => arrayOfWeekdays[day],
    weekdayLegendPosition: 'before',
    weekdayLegendOffset: 75,
    weekdayTicks: [] as number[],

    isInteractive: true,

    legends: [] as CalendarLegendProps[],
    tooltip: CalendarTooltip,
} as const

export const calendarDefaultProps = {
    ...commonDefaultProps,
    role: 'img',
} as const

export const calendarCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
} as const

export const timeRangeDefaultProps = {
    ...calendarDefaultProps,
    dayBorderColor: '#fff',
    dayRadius: 0,
    square: true,
    weekdayTicks: [1, 3, 5] as number[],
} as const
