/**
 * Compute min/max values.
 *
 * @param {Array<>}       data
 * @param {number|'auto'} minSpec - Define the strategy to use to compute min value, if number, it will be used, if 'auto', will use the lower value from the dataset
 * @param {number|'auto'} maxSpec - Define the strategy to use to compute max value, if number, it will be used, if 'auto', will use the higher value from the dataset
 * @return {[number, string]}
 */
export const computeDomain = (data, minSpec, maxSpec) => {
    const allValues = data.map(d => d.value)
    const minValue = minSpec === 'auto' ? Math.min(...allValues) : minSpec
    const maxValue = maxSpec === 'auto' ? Math.max(...allValues) : maxSpec

    return [minValue, maxValue]
}

export const computeMonthLegendPositions = ({ months, direction, position, offset }) => {
    return months.map(month => {
        let x = 0
        let y = 0
        let rotation = 0
        if (direction === 'horizontal' && position === 'before') {
            x = month.bbox.x + month.bbox.width / 2
            y = month.bbox.y - offset
        } else if (direction === 'horizontal' && position === 'after') {
            x = month.bbox.x + month.bbox.width / 2
            y = month.bbox.y + month.bbox.height + offset
        } else if (direction === 'vertical' && position === 'before') {
            x = month.bbox.x - offset
            y = month.bbox.y + month.bbox.height / 2
            rotation = -90
        } else {
            x = month.bbox.x + month.bbox.width + offset
            y = month.bbox.y + month.bbox.height / 2
            rotation = -90
        }

        return {
            ...month,
            x,
            y,
            rotation,
        }
    })
}

/**
 * Bind current data to computed day cells.
 *
 * @param {array}  days
 * @param {array}  data
 * @param {object} colorScale
 * @param {string} emptyColor
 * @returns {Array}
 */
export const bindDaysData = ({ days, data, colorScale, emptyColor }) => {
    return days.map(day => {
        day.color = emptyColor
        data.forEach(dayData => {
            if (dayData.day === day.day) {
                day.value = dayData.value
                day.color = colorScale(dayData.value)
                day.data = dayData
            }
        })
        return day
    })
}

export const computeBlockLegendPositions = ({ blocks, direction, position, offset }) => {
    return blocks.map(block => {
        let x = 0
        let y = 0
        let rotation = 0
        if (direction === 'horizontal' && position === 'before') {
            x = block.bbox.x - offset
            y = block.bbox.y + block.bbox.height / 2
            rotation = -90
        } else if (direction === 'horizontal' && position === 'after') {
            x = block.bbox.x + block.bbox.width + offset
            y = block.bbox.y + block.bbox.height / 2
            rotation = -90
        } else if (direction === 'vertical' && position === 'before') {
            x = block.bbox.x + block.bbox.width / 2
            y = block.bbox.y - offset
        } else {
            x = block.bbox.x + block.bbox.width / 2
            y = block.bbox.y + block.bbox.height + offset
        }

        return {
            ...block,
            x,
            y,
            rotation,
        }
    })
}
