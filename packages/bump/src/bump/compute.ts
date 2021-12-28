import { scalePoint } from 'd3-scale'
import { castPointScale } from '@nivo/scales'
import { BumpDataProps, BumpDatum, BumpComputedSerie, BumpSeriePoint } from './types'

export const computeSeries = <D extends BumpDatum>({
    width,
    height,
    data,
    xPadding,
    xOuterPadding,
    yOuterPadding,
}: {
    width: number
    height: number
    data: BumpDataProps<D>['data']
    xPadding: number
    xOuterPadding: number
    yOuterPadding: number
}) => {
    const xValuesSet = new Set<D['x']>()
    const yValuesSet = new Set<number>()

    data.forEach(serie => {
        serie.data.forEach(datum => {
            xValuesSet.add(datum.x)
            if (datum.y !== null) {
                yValuesSet.add(datum.y)
            }
        })
    })

    const xValues: D['x'][] = Array.from(xValuesSet)
    const xScale = castPointScale<D['x']>(
        scalePoint<D['x']>().domain(xValues).range([0, width]).padding(xOuterPadding)
    )

    const yValues: number[] = Array.from(yValuesSet).sort((a, b) => a - b)
    const yScale = castPointScale<number>(
        scalePoint<number>().domain(yValues).range([0, height]).padding(yOuterPadding)
    )

    const linePointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5)

    const series: Omit<BumpComputedSerie<D>, 'color' | 'style'>[] = data.map(rawSerie => {
        const serie: Omit<BumpComputedSerie<D>, 'color' | 'style'> = {
            ...rawSerie,
            points: [],
            linePoints: [],
        }

        rawSerie.data.forEach((datum, i) => {
            let x = null
            let y = null

            if (datum.y !== null) {
                x = xScale(datum.x)!
                y = yScale(datum.y)!
            }

            const point: BumpSeriePoint<D> = {
                id: `${rawSerie.id}.${i}`,
                serie: rawSerie,
                data: datum,
                x: x as number,
                y,
            }
            serie.points.push(point)

            // only add pre transition point if the datum is not empty
            if (point.x !== null) {
                if (i === 0) {
                    serie.linePoints.push([0, point.y])
                } else {
                    serie.linePoints.push([point.x - linePointPadding, point.y])
                }
            }

            serie.linePoints.push([point.x, point.y])

            // only add post transition point if the datum is not empty
            if (x !== null) {
                if (i === rawSerie.data.length - 1 && x) {
                    serie.linePoints.push([width, point.y])
                } else {
                    serie.linePoints.push([point.x + linePointPadding, point.y])
                }
            }

            // remove points having null coordinates
            serie.points = serie.points.filter(point => point.x !== null)
        })

        return serie
    })

    return {
        series,
        xScale,
        yScale,
    }
}
