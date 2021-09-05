import { useMemo, ReactNode } from 'react'
import {
    useTheme,
    positionFromAngle,
    // @ts-ignore: core package should be converted to TypeScript
    getLabelGenerator,
    // @ts-ignore: core package should be converted to TypeScript
    DotsItem,
} from '@nivo/core'
import { InheritedColorConfig, getInheritedColorGenerator } from '@nivo/colors'
import { RadarCommonProps, RadarDataProps } from './types'
import { ScaleLinear } from 'd3-scale'

interface RadarDotsProps<D extends Record<string, unknown>> {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    radiusScale: ScaleLinear<number, number>
    getIndex: (d: D) => string | number
    colorByKey: Record<string | number, string>
    angleStep: number
    symbol?: RadarCommonProps<D>['dotSymbol']
    size?: number
    color?: InheritedColorConfig<any>
    borderWidth?: number
    borderColor?: InheritedColorConfig<any>
    enableLabel?: boolean
    // label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    // labelFormat: PropTypes.string,
    labelYOffset?: number
}

interface Point {
    key: string
    label: ReactNode | null
    data: {
        index: string | number
        key: string | number
        value: number
        color: string
    }
    style: {
        fill: string
        stroke: string
        x: number
        y: number
    }
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
    labelFormat,
    labelYOffset,
}: RadarDotsProps<D>) => {
    const theme = useTheme()
    const fillColor = getInheritedColorGenerator(color, theme)
    const strokeColor = getInheritedColorGenerator(borderColor, theme)
    const getLabel = getLabelGenerator(label, labelFormat)

    const points: Point[] = useMemo(
        () =>
            data.reduce((acc, datum, i) => {
                const index = getIndex(datum)
                keys.forEach(key => {
                    const pointData: Point['data'] = {
                        index,
                        key,
                        value: datum[key] as number,
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
            }, [] as Point[]),
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
