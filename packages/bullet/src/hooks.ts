import { useMemo } from 'react'
import { useValueFormatter } from '@nivo/core'
import { createLinearScale, createSymlogScale } from '@nivo/scales'
import { Rect } from '@nivo/rects'
import { useOrdinalColorScale } from '@nivo/colors'
import {
    BulletDataProps,
    BulletCommonProps,
    BulletDatum,
    BulletNodeValue,
    BulletNodeTarget,
    BulletNodeRangeItem,
    BulletNode,
    BulletPropsOverrides,
    BulletCommonOverrides,
    BulletScale,
} from './types'

interface RectGetterConfig {
    p0: number
    p1: number
    bandwidth: number
    padding?: number
    isFirst?: boolean
    isLast?: boolean
}

const layoutUtils = {
    horizontal: {
        getRect: (
            container: Rect,
            { p0, p1, bandwidth, padding = 0, isFirst = false, isLast = false }: RectGetterConfig
        ): Rect => {
            let xOffset = padding
            let widthPadding = 0
            if (padding && (isFirst || isLast)) {
                widthPadding = padding
                if (isFirst) xOffset = 0
            }

            return {
                x: container.x + p0 + xOffset,
                y: container.y + (container.height - bandwidth) / 2,
                width: p1 - p0 + widthPadding,
                height: bandwidth,
            }
        },
        getTargetLine: (container: Rect, bandwidth: number, p: number) => {
            const padding = (container.height - bandwidth) / 2
            const x = container.x + p
            const y = container.y + padding

            return {
                p0: { x, y },
                p1: { x, y: y + bandwidth },
            }
        },
        getContainerRect: (
            bandIndex: number,
            bandwidth: number,
            spacing: number,
            width: number
        ): Rect => ({
            x: 0,
            y: bandwidth * bandIndex + spacing * bandIndex,
            width,
            height: bandwidth,
        }),
        getDimension: (total: number, count: number, spacing: number) =>
            (total - spacing * (count - 1)) / count,
    },
    vertical: {
        getRect: (
            container: Rect,
            { p0, p1, bandwidth, padding = 0, isFirst = false, isLast = false }: RectGetterConfig
        ): Rect => {
            let yOffset = padding
            let heightPadding = 0
            if (padding && (isFirst || isLast)) {
                heightPadding = padding
                if (isLast) yOffset = 0
            }

            return {
                x: container.x + (container.width - bandwidth) / 2,
                y: container.y + p1 + yOffset,
                width: bandwidth,
                height: p0 - p1 + heightPadding,
            }
        },
        getTargetLine: (container: Rect, bandwidth: number, p: number) => {
            const padding = (container.width - bandwidth) / 2
            const x = container.x + padding
            const y = container.y + p

            return {
                p0: { x, y },
                p1: { x: x + bandwidth, y },
            }
        },
        getContainerRect: (
            bandIndex: number,
            bandwidth: number,
            spacing: number,
            height: number
        ): Rect => ({
            x: bandwidth * bandIndex + spacing * bandIndex,
            y: 0,
            width: bandwidth,
            height,
        }),
        getDimension: (total: number, count: number, spacing: number) =>
            (total - spacing * (count - 1)) / count,
    },
}

// Pure function for computing range data
const computeRange = (
    bandId: string,
    range: BulletDatum['range'],
    scale: BulletScale,
    baseline: number,
    getRect: (p0: number, p1: number, isFirst: boolean, isLast: boolean) => Rect
): BulletNodeRangeItem[] => {
    const [min, max] = scale.domain() as [number, number]
    const sortedRange = range.slice().sort((a, b) => a.value - b.value)

    return sortedRange.reduce<BulletNodeRangeItem[]>((acc, datum, index, all) => {
        const isFirst = index === 0
        const isLast = index === all.length - 1

        let v0 = min
        let v1 = max

        const value = datum.value

        if (value >= baseline) {
            const previous = acc[index - 1]
            if (previous) {
                v0 = previous?.v1 ?? min
            }
            v1 = value
        } else {
            const next = all[index + 1]
            v0 = value
            if (next) {
                v1 = Math.min(next.value, baseline)
            }
        }

        return [
            ...acc,
            {
                id: `${bandId}.${index}`,
                index,
                isFirst,
                isLast,
                value,
                v0,
                v1,
                datum,
                rect: getRect(scale(v0), scale(v1), isFirst, isLast),
                color: '#ecd392', // Pre-assign default color
            },
        ]
    }, [])
}

export const getDatumOverrides = <P = BulletCommonOverrides>(
    datum: BulletDatum,
    overrides: BulletPropsOverrides<P> | undefined
): Partial<P> | undefined => {
    if (!overrides) return undefined
    if (typeof overrides === 'function') return overrides(datum)
    return overrides[datum.id]
}

export const useBullet = ({
    data,
    scale: scaleSpec,
    baseline,
    valueFormat,
    layout,
    width,
    height,
    spacing,
    valueSize,
    valuePadding,
    valueColor,
    targetSize,
    targetThickness,
    rangeSize,
    overrides,
}: BulletDataProps &
    Pick<
        BulletCommonProps,
        | 'scale'
        | 'baseline'
        | 'valueFormat'
        | 'layout'
        | 'spacing'
        | 'valueSize'
        | 'valuePadding'
        | 'valueColor'
        | 'targetSize'
        | 'targetThickness'
        | 'rangeSize'
        | 'overrides'
    > & {
        width: number
        height: number
    }) => {
    const formatValue = useValueFormatter(valueFormat)
    const getValueColor = useOrdinalColorScale(valueColor, 'id')

    // Get layout-specific utils
    const layoutUtil = layoutUtils[layout]

    // Memoize the bandwidth calculation
    const bandwidth = useMemo(
        () =>
            layoutUtil.getDimension(layout === 'horizontal' ? height : width, data.length, spacing),
        [layout, data.length, width, height, spacing]
    )

    return useMemo(() => {
        const valueBandwidth = bandwidth * Math.max(Math.min(valueSize, 1), 0)
        const targetBandwidth = bandwidth * Math.max(Math.min(targetSize, 1), 0)
        const rangeBandwidth = bandwidth * Math.max(Math.min(rangeSize, 1), 0)

        const nodes = data.map((datum, bandIndex) => {
            const containerRect = layoutUtil.getContainerRect(
                bandIndex,
                bandwidth,
                spacing,
                layout === 'horizontal' ? width : height
            )

            const rangeValues = datum.range.map(r => r.value)
            const all = [datum.value, ...rangeValues, baseline]
            if (datum.target) all.push(datum.target)

            const max = Math.max(...all)
            const min = Math.min(...all)

            const scaleData = { all, min, max }
            const scaleSize = (layout === 'horizontal' ? width : height) - valuePadding * 2
            const scaleAxis = layout === 'horizontal' ? 'x' : 'y'

            let scale: BulletScale
            if (scaleSpec.type === 'symlog') {
                scale = createSymlogScale(scaleSpec, scaleData, scaleSize, scaleAxis)
            } else {
                scale = createLinearScale(scaleSpec, scaleData, scaleSize, scaleAxis)
            }

            const valueV0 = Math.min(datum.value, baseline)
            const valueV1 = Math.max(datum.value, baseline)
            const color = getValueColor(datum)

            const value: BulletNodeValue = {
                id: datum.id,
                value: datum.value,
                formattedValue: formatValue(datum.value),
                v0: valueV0,
                v1: valueV1,
                rect: layoutUtil.getRect(containerRect, {
                    p0: scale(valueV0),
                    p1: scale(valueV1),
                    bandwidth: valueBandwidth,
                    padding: valuePadding,
                }),
                color,
                datum,
            }

            const target: BulletNodeTarget = {
                id: datum.id,
                value: datum.target,
                formattedValue: formatValue(datum.target),
                ...layoutUtil.getTargetLine(containerRect, targetBandwidth, scale(datum.target)),
                color: '#a65901',
                datum,
            }

            const range = computeRange(
                datum.id,
                datum.range,
                scale,
                datum.baseline ?? baseline,
                (p0: number, p1: number, isFirst: boolean, isLast: boolean) => {
                    return layoutUtil.getRect(containerRect, {
                        p0,
                        p1,
                        bandwidth: rangeBandwidth,
                        padding: valuePadding,
                        isFirst,
                        isLast,
                    })
                }
            )

            return {
                id: datum.id,
                datum,
                index: bandIndex,
                scale,
                rect: containerRect,
                color,
                value,
                target,
                range,
            } as BulletNode
        })

        const valueNodes = nodes.map(({ value }) => value)
        const targetNodes = nodes.map(({ target }) => target)
        const rangeNodes = nodes.flatMap(({ range }) => range)

        return {
            nodes,
            valueNodes,
            targetNodes,
            rangeNodes,
        }
    }, [
        data,
        scaleSpec,
        baseline,
        formatValue,
        layout,
        width,
        height,
        spacing,
        valueSize,
        valuePadding,
        getValueColor,
        targetSize,
        targetThickness,
        rangeSize,
        overrides,
        bandwidth,
        layoutUtil,
    ])
}
