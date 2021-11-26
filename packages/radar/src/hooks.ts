import { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import {
    // @ts-ignore
    bindDefs,
    useCurveInterpolation,
    usePropertyAccessor,
    useValueFormatter,
} from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { svgDefaultProps } from './props'
import {
    RadarColorMapping,
    RadarCommonProps,
    RadarDataProps,
    RadarCustomLayerProps,
    RadarSvgProps,
    BoundLegendProps,
} from './types'

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
    legends,
    defs,
    fill,
}: {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    indexBy: RadarDataProps<D>['indexBy']
    maxValue: RadarCommonProps<D>['maxValue']
    valueFormat?: RadarCommonProps<D>['valueFormat']
    curve: RadarCommonProps<D>['curve']
    width: number
    height: number
    colors: RadarCommonProps<D>['colors']
    legends: RadarCommonProps<D>['legends']
    defs: RadarSvgProps<D>['defs']
    fill: RadarSvgProps<D>['fill']
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

    const { boundDefs, fillByKey } = useMemo(() => {
        // expand keys into structure expected by bindDefs
        const keyData = keys.map(k => ({ key: k, color: colorByKey[k], data, fill: null }))
        const boundDefs = bindDefs(defs, keyData, fill)
        const fillByKey = keyData.reduce<Record<string, string | null>>((mapping, keyDatum) => {
            const { key: keyName, fill } = keyDatum
            mapping[keyName] = fill
            return mapping
        }, {})

        return { boundDefs, fillByKey }
    }, [keys, data, defs, fill, colorByKey])

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
    }, [keys, data, maxValue, width, height])

    const curveFactory = useCurveInterpolation(curve)

    const customLayerProps: RadarCustomLayerProps<D> = useMemo(
        () => ({
            data,
            keys,
            indices,
            colorByKey,
            centerX,
            centerY,
            radiusScale,
            angleStep,
        }),
        [data, keys, indices, colorByKey, centerX, centerY, radiusScale, angleStep]
    )

    const legendData = useMemo(
        () => keys.map(key => ({ id: key, label: key, color: colorByKey[key] })),
        [keys, colorByKey]
    )

    const boundLegends: BoundLegendProps[] = useMemo(
        () =>
            legends.map(({ data: customData, ...legend }) => {
                const boundData = customData?.map(cd => {
                    const findData = legendData.find(ld => ld.id === cd.id) || {}
                    return { ...findData, ...cd }
                })
                return { ...legend, data: boundData || legendData }
            }),
        [legends, legendData]
    )

    return {
        getIndex,
        indices,
        formatValue,
        colorByKey,
        fillByKey,
        boundDefs,
        radius,
        radiusScale,
        centerX,
        centerY,
        angleStep,
        curveFactory,
        legendData,
        boundLegends,
        customLayerProps,
    }
}
