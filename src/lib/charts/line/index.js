import { range, max, maxBy, sumBy, uniq } from 'lodash'
import { scalePoint, scaleLinear } from 'd3'

/**
 * Generates X scale.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @returns {Function}
 */
export const getXScale = (data, width) => {
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

    return scalePoint().range([0, width]).domain(data[0].data.map(({ x }) => x))
}

/**
 * Generates Y scale for line chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         height
 * @returns {Function}
 */
export const getYScale = (data, height) => {
    const maxY = maxBy(data.reduce((acc, serie) => [...acc, ...serie.data], []), 'y').y

    return scaleLinear().rangeRound([height, 0]).domain([0, maxY])
}

/**
 * Generates Y scale for stacked line chart.
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
 * Generates x/y scales & lines for line chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       color
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export const generateLines = (data, width, height, color) => {
    const xScale = getXScale(data, width)
    const yScale = getYScale(data, height)

    const lines = data.map(({ id, data: serie }) => ({
        id,
        color: color(id),
        points: serie.map(d =>
            Object.assign({}, d, {
                value: d.y,
                x: xScale(d.x),
                y: yScale(d.y),
            })
        ),
    }))

    return { xScale, yScale, lines }
}

/**
 * Generates x/y scales & lines for stacked line chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       color
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export const generateStackedLines = (data, width, height, color) => {
    const xScale = getXScale(data, width)
    const yScale = getStackedYScale(data, xScale, height)

    const lines = data.reduce((acc, { id, data: serie }, serieIndex) => {
        const previousPoints = serieIndex === 0 ? null : acc[serieIndex - 1].points

        return [
            ...acc,
            {
                id,
                color: color(id),
                points: serie
                    .map((d, i) => {
                        if (!previousPoints) {
                            return Object.assign({}, d, {
                                value: d.y,
                                x: d.x,
                                y: d.y,
                            })
                        }

                        return Object.assign({}, d, {
                            value: d.y,
                            x: d.x,
                            y: d.y + previousPoints[i].accY,
                        })
                    })
                    .map(d => ({
                        value: d.value,
                        accY: d.y,
                        x: xScale(d.x),
                        y: yScale(d.y),
                    })),
            },
        ]
    }, [])

    return { xScale, yScale, lines }
}
