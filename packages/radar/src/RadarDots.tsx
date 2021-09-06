import { useMemo } from 'react'
import { ScaleLinear } from 'd3-scale'
import {
    useTheme,
    positionFromAngle,
    // @ts-ignore: core package should be converted to TypeScript
    DotsItem,
    usePropertyAccessor,
} from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/colors'
import { RadarCommonProps, RadarDataProps, PointProps, PointData, RadarColorMapping } from './types'

interface RadarDotsProps<D extends Record<string, unknown>> {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    radiusScale: ScaleLinear<number, number>
    getIndex: (d: D) => string
    colorByKey: RadarColorMapping
    angleStep: number
    symbol?: RadarCommonProps['dotSymbol']
    size: number
    color: RadarCommonProps['dotColor']
    borderWidth: number
    borderColor: RadarCommonProps['dotBorderColor']
    enableLabel: boolean
    label: RadarCommonProps['dotLabel']
    formatValue: (value: number, context: string) => string
    labelYOffset: number
}

export const RadarDots = <D extends Record<string, unknown>>({
    data,
    keys,
    getIndex,
    colorByKey,
    radiusScale,
    angleStep,
    symbol,
    size = 6,
    color = { from: 'color' },
    borderWidth = 0,
    borderColor = { from: 'color' },
    enableLabel = false,
    label = 'value',
    formatValue,
    labelYOffset,
}: RadarDotsProps<D>) => {
    const theme = useTheme()
    const fillColor = getInheritedColorGenerator(color, theme)
    const strokeColor = getInheritedColorGenerator(borderColor, theme)
    const getLabel = usePropertyAccessor<PointData, string | number>(label)

    const points: PointProps[] = useMemo(
        () =>
            data.reduce((acc, datum, i) => {
                const index = getIndex(datum)
                keys.forEach(key => {
                    const value = datum[key] as number

                    const pointData: PointData = {
                        index,
                        key,
                        value,
                        formattedValue: formatValue(value, key),
                        color: colorByKey[key],
                    }

                    acc.push({
                        key: `${key}.${index}`,
                        label: enableLabel ? getLabel(pointData) : null,
                        style: {
                            fill: fillColor(pointData),
                            stroke: strokeColor(pointData),
                            ...positionFromAngle(
                                angleStep * i - Math.PI / 2,
                                radiusScale(datum[key] as number)
                            ),
                        },
                        data: pointData,
                    })
                })

                return acc
            }, [] as PointProps[]),
        [
            data,
            getIndex,
            colorByKey,
            enableLabel,
            getLabel,
            fillColor,
            strokeColor,
            angleStep,
            radiusScale,
        ]
    )

    return (
        <>
            {points.map(point => (
                <DotsItem
                    key={point.key}
                    x={point.style.x}
                    y={point.style.y}
                    symbol={symbol}
                    size={size}
                    color={point.style.fill}
                    borderWidth={borderWidth}
                    borderColor={point.style.stroke}
                    label={point.label}
                    labelYOffset={labelYOffset}
                    theme={theme}
                    datum={point.data}
                />
            ))}
        </>
    )
}
