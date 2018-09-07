/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear, scalePoint } from 'd3-scale'

export const computeParallelCoordinatesLayout = ({ width, height, data, variables, layout }) => {
    const variablesScale = scalePoint()
        .range(layout === 'horizontal' ? [0, width] : [height, 0])
        .domain(variables.map(({ key }) => key))

    const range = layout === 'horizontal' ? [height, 0] : [0, width]
    const variablesWithScale = variables.map(variable => {
        const allValues = new Set()
        data.forEach(d => allValues.add(d[variable.key]))

        let scale
        if (variable.type === 'linear') {
            const min =
                variable.min !== undefined && variable.min !== 'auto'
                    ? variable.min
                    : Math.min(...Array.from(allValues))
            const max =
                variable.max !== undefined && variable.max !== 'auto'
                    ? variable.max
                    : Math.max(...Array.from(allValues))

            scale = scaleLinear()
                .rangeRound(range)
                .domain([min, max])
        }

        if (variable.type === 'point') {
            scale = scalePoint()
                .range(range)
                .domain(variable.values || allValues)

            if (variable.padding !== undefined) {
                scale.padding(variable.padding)
            }
        }

        return {
            ...variable,
            scale,
            values: Array.from(allValues),
        }
    })

    const dataWithPoints = data.map((datum, index) => {
        const points = variablesWithScale.map(variable => ({
            x:
                layout === 'horizontal'
                    ? variablesScale(variable.key)
                    : variable.scale(datum[variable.key]),
            y:
                layout === 'horizontal'
                    ? variable.scale(datum[variable.key])
                    : variablesScale(variable.key),
        }))

        return { index, ...datum, points }
    })

    return {
        variablesScale,
        variablesWithScale,
        dataWithPoints,
    }
}

export const computeAxisDensity = (variable, data) => {
    let kernels
    if (variable.type === 'point') {
        kernels = data.reduce((acc, datum) => {
            const value = datum[variable.key]
            let kernel = acc.find(k => k.id === value)
            if (kernel === undefined) {
                kernel = { id: value, count: 0 }
                acc.push(kernel)
            }
            kernel.count++

            return acc
        }, [])
        kernels = variable.scale
            .domain()
            .map(d => kernels.find(k => k.id === d))
            .filter(k => k !== undefined)
    } else if (variable.type === 'linear') {
        kernels = variable.scale.ticks(5).map((id, index, ticks) => {
            if (index === 0) {
                return {
                    id,
                    count: variable.values.filter(v => v <= id).length,
                }
            }

            return {
                id,
                count: variable.values.filter(v => v > ticks[index - 1] && v <= id).length,
            }
        })
    }

    if (kernels !== undefined) {
        const scale = scaleLinear()
            .rangeRound([0, 60])
            .domain([0, Math.max(...kernels.map(k => k.count))])

        return kernels.map(k => ({
            id: k.id,
            position: variable.scale(k.id),
            size: scale(k.count),
        }))
    }

    return []
}
