import { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { useCurveInterpolation, usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { svgDefaultProps } from './props'
import { RadarColorMapping, RadarCommonProps, RadarDataProps } from './types'

export const useRadar = <D extends Record<string, unknown>>({
    data,
    keys,
    indexBy,
    maxValue,
    valueFormat,
    curve,
    width,
    height,
    colors = svgDefaultProps.colors,
}: {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    indexBy: RadarDataProps<D>['indexBy']
    maxValue: RadarCommonProps['maxValue']
    valueFormat?: RadarCommonProps['valueFormat']
    curve: RadarCommonProps['curve']
    width: number
    height: number
    colors: RadarCommonProps['colors']
}) => {
    const getIndex = usePropertyAccessor<D, string>(indexBy)
    const indices = useMemo(() => data.map(getIndex), [data, getIndex])
    const formatValue = useValueFormatter<number, string>(valueFormat)

    const getColor = useOrdinalColorScale<{ key: string; index: number }>(colors, 'key')
    const colorByKey: RadarColorMapping = useMemo(
        () =>
            keys.reduce<RadarColorMapping>((mapping, key, index) => {
                mapping[key] = getColor({ key, index })
                return mapping
            }, {}),
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
        formatValue,
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
