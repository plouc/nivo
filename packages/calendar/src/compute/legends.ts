import { BBox, CalendarSvgProps } from '../types'

const computeLongitudinalLegendPositions = <Item extends { bbox: BBox }>({
    items,
    direction,
    position,
    offset,
    rotation,
}: Pick<Required<CalendarSvgProps>, 'direction'> & {
    offset: number
    position: 'before' | 'after'
    rotation: number
    items: Item[]
}) => {
    return items.map(item => {
        let x
        let y
        const bbox = item.bbox
        if (direction === 'horizontal' && position === 'before') {
            x = bbox.x - offset
            y = bbox.y + bbox.height / 2
        } else if (direction === 'horizontal' && position === 'after') {
            x = bbox.x + bbox.width + offset
            y = bbox.y + bbox.height / 2
        } else if (direction === 'vertical' && position === 'before') {
            x = bbox.x + bbox.width / 2
            y = bbox.y - offset
        } else {
            x = bbox.x + bbox.width / 2
            y = bbox.y + bbox.height + offset
        }
        return {
            ...item,
            x,
            y,
            rotation,
        }
    })
}

export const computeYearLegendPositions = <Item extends { bbox: BBox }>({
    years,
    direction,
    position,
    offset,
}: Pick<Required<CalendarSvgProps>, 'direction'> & {
    offset: number
    position: 'before' | 'after'
    years: Item[]
}) => {
    // in horizontal mode, year labels are rotated
    const rotation = direction === 'horizontal' ? -90 : 0
    return computeLongitudinalLegendPositions({
        items: years,
        direction,
        position,
        offset,
        rotation,
    })
}

export const computeWeekdayLegendPositions = <Item extends { bbox: BBox }>({
    weekdays,
    direction,
    position,
    offset,
}: Pick<Required<CalendarSvgProps>, 'direction'> & {
    offset: number
    position: 'before' | 'after'
    weekdays: Item[]
}) => {
    // in horizontal mode, weekdays labels are not rotated
    const rotation = direction === 'horizontal' ? 0 : -90
    return computeLongitudinalLegendPositions({
        items: weekdays,
        direction,
        position,
        offset,
        rotation,
    })
}

export const computeMonthLegendPositions = <Month extends { bbox: BBox }>({
    months,
    direction,
    position,
    offset,
}: Pick<Required<CalendarSvgProps>, 'direction'> & {
    offset: number
    position: 'before' | 'after'
    months: Month[]
}) => {
    const rotation = direction === 'horizontal' ? 0 : -90
    return months.map(month => {
        let x
        let y
        const bbox = month.bbox
        if (direction === 'horizontal' && position === 'before') {
            x = bbox.x + bbox.width / 2
            y = bbox.y - offset
        } else if (direction === 'horizontal' && position === 'after') {
            x = bbox.x + bbox.width / 2
            y = bbox.y + bbox.height + offset
        } else if (direction === 'vertical' && position === 'before') {
            x = bbox.x - offset
            y = bbox.y + bbox.height / 2
        } else {
            x = bbox.x + bbox.width + offset
            y = bbox.y + bbox.height / 2
        }
        return {
            ...month,
            x,
            y,
            rotation,
        }
    })
}
