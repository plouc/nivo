import { prepareSeries } from '../src/compute'

const computeScale = (
    { type, axis, min: scaleMin, max: scaleMax },
    { width, height, stacked = false },
    series
) => {
    const {
        x,
        sortedX,
        minX,
        maxX,
        stackX,
        minStackX,
        maxStackX,
        y,
        sortedY,
        minY,
        maxY,
        stackY,
        minStackY,
        maxStackY,
    } = prepareSeries(series)

    if (type === 'linear') {
        let minValue = scaleMin
        if (scaleMin === 'auto') minValue = Math.min(...values)
        let maxValue = scaleMax
        if (scaleMax === 'auto') maxValue = Math.max(...values)

        const scale = scaleLinear()
            .range(axis === 'x' ? [0, size] : [size, 0])
            .domain([minValue, maxValue])

        console.log('linear', minValue, maxValue, scale)

        return scale
    } else if (type === 'point') {
        const scale = scalePoint()
            .range([0, size])
            .domain(values)

        console.log('point', values, scale)

        return scale
    }
}

it('should prepare data', () => {
    const prepared = prepareSeries([
        {
            id: 'fake corp. A',
            data: [{ x: 0, y: 5 }, { x: 1, y: 7 }, { x: 2, y: 9 }],
        },
        {
            id: 'fake corp. B',
            data: [{ x: 2, y: 11 }, { x: 3, y: 12 }, { x: 4, y: 15 }],
        },
        {
            id: 'fake corp. C',
            data: [{ x: 5, y: 19 }, { x: 6, y: 13 }, { x: 7, y: 9 }],
        },
    ])

    console.log(
        require('util').inspect(prepared, {
            depth: null,
            colors: true,
        })
    )
})
