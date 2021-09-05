import { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { useCurveInterpolation, usePropertyAccessor } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { svgDefaultProps } from './props'
import { RadarCommonProps, RadarDataProps } from './types'

export const useRadar = <D extends Record<string, unknown>>({
    data,
    keys,
    indexBy,
    maxValue,
    curve,
    width,
    height,
    colors = svgDefaultProps.colors,
}: {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    indexBy: RadarDataProps<D>['indexBy']
    maxValue: RadarCommonProps<D>['maxValue']
    curve: RadarCommonProps<D>['curve']
    width: number
    height: number
    colors: RadarCommonProps<D>['colors']
}) => {
    const getIndex = usePropertyAccessor<D, string | number>(indexBy)
    const indices = useMemo(() => data.map(getIndex), [data, getIndex]) as string[] | number[]

    const getColor = useOrdinalColorScale<{ key: string | number; index: number }>(colors, 'key')
    const colorByKey: Record<string | number, string> = useMemo(
        () =>
            keys.reduce(
                (mapping: Record<string | number, string>, key: string | number, index: number) => {
                    mapping[key] = getColor({ key, index })
                    return mapping
                },
                {} as Record<string | number, string>
            ),
        [keys, getColor]
    )

    const { radius, radiusScale, centerX, centerY, angleStep } = useMemo(() => {
        const allValues: number[] = data.reduce(
            (acc: number[], d) => [...acc, ...keys.map(key => d[key] as number)],
            [] as number[]
        )
        const computedMaxValue = maxValue !== 'auto' ? maxValue : Math.max(...allValues)

        const radius = Math.min(width, height) / 2
        const radiusScale = scaleLinear<number, number>()
            .range([0, radius])
            .domain([0, computedMaxValue])

        return {
            radius,
            radiusScale,
            centerX: width / 2,
            centerY: height / 2,
            angleStep: (Math.PI * 2) / data.length,
        }
    }, [keys, indexBy, data, maxValue, width, height])

    const curveFactory = useCurveInterpolation(curve)

    const legendData = keys.map(key => ({
        id: key,
        label: key,
        color: colorByKey[key],
    }))

    return {
        getIndex,
        indices,
        colorByKey,
        radius,
        radiusScale,
        centerX,
        centerY,
        angleStep,
        curveFactory,
        legendData,
    }
}
