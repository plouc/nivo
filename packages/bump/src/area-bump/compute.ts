import { scalePoint, scaleLinear } from 'd3-scale'
import { castPointScale, castLinearScale, ScalePoint, ScaleLinear } from '@bitbloom/nivo-scales'
import {
    AreaBumpCommonProps,
    AreaBumpComputedSerie,
    AreaBumpDataProps,
    AreaBumpDatum,
    AreaBumpSerieExtraProps,
} from './types'

export const computeSeries = <
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
>({
    data,
    width,
    height,
    align,
    spacing,
    xPadding,
}: {
    data: AreaBumpDataProps<Datum, ExtraProps>['data']
    width: number
    height: number
    align: AreaBumpCommonProps<Datum, ExtraProps>['align']
    spacing: AreaBumpCommonProps<Datum, ExtraProps>['spacing']
    xPadding: AreaBumpCommonProps<Datum, ExtraProps>['xPadding']
}): {
    series: Omit<
        AreaBumpComputedSerie<Datum, ExtraProps>,
        'color' | 'fill' | 'fillOpacity' | 'borderWidth' | 'borderColor' | 'borderOpacity'
    >[]
    xScale: ScalePoint<Datum['x']>
    heightScale: ScaleLinear<number>
} => {
    const slices = new Map<
        Datum['x'],
        {
            id: Datum['x']
            total: number
            x: number
            values: Map<
                string,
                {
                    serieId: string
                    value: number
                    position: number
                    height: number
                    beforeHeight: number
                }
            >
        }
    >()

    let maxSum: number
    let maxValues: number

    data.forEach(serie => {
        serie.data.forEach(datum => {
            if (!slices.has(datum.x)) {
                slices.set(datum.x, {
                    id: datum.x,
                    total: 0,
                    values: new Map(),
                    x: 0,
                })
            }

            const slice = slices.get(datum.x)!

            const total = slice.total + datum.y
            slice.total = total

            slice.values.set(serie.id, {
                serieId: serie.id,
                value: datum.y,
                position: 0,
                height: 0,
                beforeHeight: 0,
            })

            if (maxSum === undefined || total > maxSum) {
                maxSum = total
            }
            if (maxValues === undefined || slice.values.size > maxValues) {
                maxValues = slice.values.size
            }
        })
    })

    const xScale = castPointScale<Datum['x']>(
        scalePoint<Datum['x']>().domain(Array.from(slices.keys())).range([0, width])
    )

    const heightScale = castLinearScale<number, number>(
        scaleLinear<number, number>()
            .domain([0, maxSum!])
            .range([0, height - maxValues! * spacing])
    )

    slices.forEach((slice, x) => {
        slice.x = xScale(x)!
        const sliceHeight = heightScale(slice.total) + slice.values.size * spacing

        let offset = 0
        if (align === 'middle') {
            offset = (height - sliceHeight) / 2
        } else if (align === 'end') {
            offset = height - sliceHeight
        }

        Array.from(slice.values.values())
            .sort((a, b) => b.value - a.value)
            .forEach((value, position, all) => {
                const previousValues = all.filter((_i, pos) => pos < position)
                const beforeValue = previousValues.reduce((t, v) => t + v.value, 0)

                const sliceValue = slice.values.get(value.serieId)!
                sliceValue.position = position
                sliceValue.height = heightScale(value.value)
                sliceValue.beforeHeight =
                    heightScale(beforeValue) + offset + spacing * (previousValues.length + 0.5)
            })
    })

    const areaPointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5)

    const series = data.map(serie => {
        const computedSerie: Omit<
            AreaBumpComputedSerie<Datum, ExtraProps>,
            'color' | 'fill' | 'fillOpacity' | 'borderWidth' | 'borderColor' | 'borderOpacity'
        > = {
            id: serie.id,
            data: serie,
            points: [],
            areaPoints: [],
        }

        serie.data.forEach((datum, i) => {
            const slice = slices.get(datum.x)!
            const position = slice.values.get(serie.id)!

            const x = slice.x
            const { beforeHeight, height } = position
            const y = beforeHeight + height / 2
            const y0 = beforeHeight
            const y1 = beforeHeight + height

            computedSerie.points.push({
                x,
                y,
                height,
                data: { ...datum },
            })
            if (i > 0) {
                computedSerie.areaPoints.push({ x: x - areaPointPadding, y0, y1 })
            }
            computedSerie.areaPoints.push({ x, y0, y1 })
            if (i < serie.data.length - 1) {
                computedSerie.areaPoints.push({ x: x + areaPointPadding, y0, y1 })
            }
        })

        return computedSerie
    })

    return {
        series,
        xScale,
        heightScale,
    }
}
