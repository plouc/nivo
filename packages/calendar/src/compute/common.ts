import { CalendarSvgProps, ColorScale, Datum, Weekday, BBox } from '../types'
import { ScaleQuantize } from 'd3-scale'

export interface ComputeBaseProps {
    direction: 'horizontal' | 'vertical'
}

export interface ComputeBaseSpaceProps {
    daySpacing: number
}

export interface ComputeBaseDimensionProps {
    cellWidth: number
    cellHeight: number
}

interface ComputeWeekdays
    extends Omit<ComputeBaseProps, 'daysInRange'>,
        Omit<ComputeBaseSpaceProps, 'offset'>,
        ComputeBaseDimensionProps {
    bbox: BBox
    ticks?: number[]
    arrayOfWeekdays?: string[]
}

/**
 * Bind current data to computed day cells.
 */
export const bindDaysData = ({
    days,
    data,
    colorScale,
    emptyColor,
}: Pick<Required<CalendarSvgProps>, 'data' | 'emptyColor'> & {
    colorScale: ScaleQuantize<string> | ColorScale
    days: Array<Omit<Datum, 'color' | 'data' | 'value' | 'size'>>
}) => {
    return days.map(day => {
        const dayData = data.find(item => item.day === day.day)

        if (!dayData) {
            return { ...day, color: emptyColor }
        }

        return {
            ...day,
            color: colorScale(dayData.value),
            data: dayData,
            value: dayData.value,
        }
    })
}

export const computeWeekdays = ({
    bbox,
    cellHeight,
    cellWidth,
    direction,
    daySpacing,
    ticks = [1, 3, 5],
}: ComputeWeekdays) => {
    const horizontal = direction === 'horizontal'
    const cellSize = daySpacing + (horizontal ? cellHeight : cellWidth)
    return ticks.map((day: number) => {
        return {
            day,
            bbox: {
                x: bbox.x + (horizontal ? 0 : cellSize * day),
                y: bbox.y + (horizontal ? cellSize * day : 0),
                width: horizontal ? bbox.width : cellSize,
                height: horizontal ? cellSize : bbox.height,
            },
        } as Weekday
    })
}
