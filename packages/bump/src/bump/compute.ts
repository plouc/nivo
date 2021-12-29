import { scalePoint } from 'd3-scale'
import { castPointScale } from '@nivo/scales'
import {
    BumpDataProps,
    BumpDatum,
    BumpComputedSerie,
    BumpSeriePoint,
    BumpSerieExtraProps,
} from './types'

export const computeSeries = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    width,
    height,
    data,
    xPadding,
    xOuterPadding,
    yOuterPadding,
}: {
    width: number
    height: number
    data: BumpDataProps<Datum, ExtraProps>['data']
    xPadding: number
    xOuterPadding: number
    yOuterPadding: number
}) => {
    const xValuesSet = new Set<Datum['x']>()
    const yValuesSet = new Set<number>()

    data.forEach(serie => {
        serie.data.forEach(datum => {
            xValuesSet.add(datum.x)
            if (datum.y !== null) {
                yValuesSet.add(datum.y)
            }
        })
    })

    const xValues: Datum['x'][] = Array.from(xValuesSet)
    const xScale = castPointScale<Datum['x']>(
        scalePoint<Datum['x']>().domain(xValues).range([0, width]).padding(xOuterPadding)
    )

    const yValues: number[] = Array.from(yValuesSet).sort((a, b) => a - b)
    const yScale = castPointScale<number>(
        scalePoint<number>().domain(yValues).range([0, height]).padding(yOuterPadding)
    )

    const linePointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5)

    const series: Omit<BumpComputedSerie<Datum, ExtraProps>, 'color' | 'opacity' | 'lineWidth'>[] =
        data.map(rawSerie => {
            const serie: Omit<
                BumpComputedSerie<Datum, ExtraProps>,
                'color' | 'opacity' | 'lineWidth'
            > = {
                id: rawSerie.id,
                data: rawSerie,
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

                const point: BumpSeriePoint<Datum, ExtraProps> = {
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
