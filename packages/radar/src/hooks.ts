import { useMemo } from 'react'
import { uniq } from 'lodash'
import { arc as d3Arc, lineRadial } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { ClosedCurveInterpolationId, positionFromAngle, useCurveInterpolation } from '@nivo/core'
import { OrdinalColorScale, useOrdinalColorScale } from '@nivo/colors'

export interface BaseRadarDatum {
    x: string | number
    y: number
}

export type RadarData<Datum extends BaseRadarDatum> = Array<{
    id: string
    data: Datum[]
}>

export interface RadarSerieDatum<Datum extends BaseRadarDatum> {
    angle: number
    radius: number
    x: number
    y: number
    data: Datum
}

export interface RadarSerie<Datum extends BaseRadarDatum> {
    id: string
    color: string
    data: Array<RadarSerieDatum<Datum>>
}

export interface RadarSliceDatum {
    id: string
    color: string
    value: number
}

export interface RadarSlice {
    index: number | string
    // mid angle in radians
    angle: number
    // start angle in radians
    startAngle: number
    // end angle in radians
    endAngle: number
    data: RadarSliceDatum[]
}

export const useRadar = <Datum extends BaseRadarDatum>({
    width,
    height,
    data,
    colors,
    maxValue,
    shapeInterpolation,
}: {
    width: number
    height: number
    data: RadarData<Datum>
    colors: OrdinalColorScale<Datum>
    maxValue: number | 'auto'
    shapeInterpolation: ClosedCurveInterpolationId
}) => {
    const radius = Math.min(width, height) / 2
    const centerX = width / 2
    const centerY = height / 2

    const xValues = uniq(
        data.reduce((acc: Array<number | string>, serie) => {
            return [...acc, ...serie.data.map(d => d.x)]
        }, [])
    )
    const yValues = uniq(
        data.reduce((acc: number[], serie) => {
            return [...acc, ...serie.data.map(d => d.y)]
        }, [])
    )
    const maxYValue = maxValue !== 'auto' ? maxValue : Math.max(...yValues)

    const radiusScale = useMemo(
        () =>
            scaleLinear<number, number>()
                .domain([0, maxYValue])
                .range([0, radius]),
        [maxYValue, radius]
    )

    const angleStep = (Math.PI * 2) / xValues.length

    const getColor = useOrdinalColorScale(colors, 'id')

    const series = useMemo(
        () =>
            data.map(
                (serie): RadarSerie<Datum> => {
                    return {
                        color: getColor(serie as any),
                        ...serie,
                        data: serie.data.map((datum, i) => {
                            const datumAngle = i * angleStep
                            const datumRadius = radiusScale(datum.y)

                            return {
                                angle: datumAngle,
                                radius: datumRadius,
                                ...positionFromAngle(datumAngle - Math.PI / 2, datumRadius),
                                data: datum,
                            }
                        }),
                    }
                }
            ),
        [data, angleStep, radiusScale, getColor]
    )

    const shapeInterpolator = useCurveInterpolation(shapeInterpolation)
    const shapeGenerator = useMemo(
        () =>
            lineRadial<any>()
                .angle(d => d.angle)
                .radius(d => d.radius)
                .curve(shapeInterpolator),
        [shapeInterpolator]
    )

    const sliceGenerator = useMemo(
        () =>
            d3Arc<any, RadarSlice>()
                .outerRadius(radius)
                .innerRadius(0)
                .startAngle(d => d.startAngle + Math.PI / 2)
                .endAngle(d => d.endAngle + Math.PI / 2),
        [radius]
    )

    const slices = useMemo(
        () =>
            xValues.map(
                (x, i): RadarSlice => {
                    const sliceAngle = i * angleStep - Math.PI / 2

                    return {
                        index: x,
                        angle: sliceAngle,
                        startAngle: sliceAngle - angleStep / 2,
                        endAngle: sliceAngle + angleStep / 2,
                        data: series.map(serie => {
                            const matchingDatum = serie.data.find(datum => datum.data.x === x)

                            return {
                                id: serie.id,
                                color: serie.color,
                                value: matchingDatum!.data.y,
                            }
                        }),
                    }
                }
            ),
        [xValues, series, angleStep]
    )

    return {
        series,
        slices,
        radius,
        centerX,
        centerY,
        angleStep,
        shapeGenerator,
        sliceGenerator,
    }
}
