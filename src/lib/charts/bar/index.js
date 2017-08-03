import { range, max, maxBy, sumBy, uniq } from 'lodash'
import { scaleBand, scaleLinear } from 'd3'

/**
 * Generates X scale.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @param {number}         padding
 * @returns {Function}
 */
export const getXScale = (data, width, padding) => {
    const xLengths = uniq(data.map(({ data }) => data.length))
    if (xLengths.length > 1) {
        throw new Error(
            [
                `Found inconsitent data for x,`,
                `expecting all series to have same length`,
                `but found: ${xLengths.join(', ')}`,
            ].join(' ')
        )
    }

    return scaleBand()
        .rangeRound([0, width])
        .domain(data[0].data.map(({ x }) => x))
        .padding(padding)
}

/**
 * Generates Y scale for grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         height
 * @returns {Function}
 */
export const getGroupedYScale = (data, height) => {
    const maxY = maxBy(data.reduce((acc, serie) => [...acc, ...serie.data], []), 'y').y

    return scaleLinear().rangeRound([height, 0]).domain([0, maxY])
}

/**
 * Generates Y scale for stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Object}         xScale
 * @param {number}         height
 */
export const getStackedYScale = (data, xScale, height) => {
    const maxY = max(range(xScale.domain().length).map(i => sumBy(data, serie => serie.data[i].y)))

    return scaleLinear().rangeRound([height, 0]).domain([0, maxY])
}

/**
 * Generates x/y scales & bars for grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       color
 * @param {number}         xPadding
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateGroupedBars = (data, width, height, color, { xPadding = 0 } = {}) => {
    const xScale = getXScale(data, width, xPadding)
    const yScale = getGroupedYScale(data, height)

    const bars = []
    data.forEach((serie, serieIndex) => {
        serie.data.forEach(d => {
            const barWidth = xScale.bandwidth() / data.length
            const x = xScale(d.x) + barWidth * serieIndex
            const y = yScale(d.y)
            const barHeight = height - y

            const value = d.y

            if (barWidth > 0 && barHeight > 0) {
                bars.push({
                    key: `${serie.id}.${d.x}`,
                    value,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: color({ ...d, serie }),
                })
            }
        })
    })

    return { xScale, yScale, bars }
}

/**
 * Generates x/y scales & bars for stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       color
 * @param {number}         xPadding
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateStackedBars = (data, width, height, color, { xPadding = 0 } = {}) => {
    const xScale = getXScale(data, width, xPadding)
    const yScale = getStackedYScale(data, xScale, height)

    const stackedData = data.map(serie => ({
        ...serie,
        data: [],
    }))

    range(xScale.domain().length).forEach((__, index) => {
        data.forEach(({ data: serie }, serieIndex) => {
            const d = serie[index]

            let y0 = 0
            let y1 = d.y
            if (serieIndex > 0) {
                y0 = stackedData[serieIndex - 1].data[index].y1
                y1 = d.y + y0
            }

            stackedData[serieIndex].data[index] = Object.assign({}, d, {
                y0,
                y1,
            })
        })
    })

    const bars = []
    stackedData.forEach(serie => {
        serie.data.forEach(d => {
            const x = xScale(d.x)
            const barWidth = xScale.bandwidth()
            const y = yScale(d.y1)
            const barHeight = yScale(d.y0) - y

            const value = d.y

            if (barWidth > 0 && barHeight > 0) {
                bars.push({
                    key: `${serie.id}.${d.x}`,
                    value,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: color({ ...d, serie }),
                })
            }
        })
    })

    return { xScale, yScale, bars }
}
