import { BulletRectsProps, ComputedRangeDatum } from './types'
// @ts-ignore
import { getColorScale } from '@nivo/core'

type ComputeRect = Pick<BulletRectsProps, 'layout' | 'reverse' | 'scale' | 'height'>

export const stackValues = (
    values: number[],
    colorScale: ReturnType<getColorScale>,
    useAverage = false
) => {
    const normalized = [...values].filter(v => v !== 0).sort((a, b) => a - b)

    return normalized.reduce<ComputedRangeDatum[]>((acc, v1, index) => {
        const [last] = acc.slice(-1)
        const v0 = last?.v1 ?? 0
        const sequentialValue = useAverage === true ? v0 + (v1 - v0) / 2 : v1

        return [
            ...acc,
            {
                index,
                v0,
                v1,
                color: colorScale(colorScale.type === 'sequential' ? sequentialValue : index),
            },
        ]
    }, [])
}

export const getComputeRect = ({ layout, reverse, scale, height }: ComputeRect) => {
    if (layout === 'horizontal') {
        if (reverse === true) {
            return (d: ComputedRangeDatum) => {
                const x = scale(d.v1)
                const w = scale(d.v0) - x

                return { x, y: 0, width: w, height }
            }
        }

        return (d: ComputedRangeDatum) => {
            const x = scale(d.v0)
            const w = scale(d.v1) - x

            return { x, y: 0, width: w, height }
        }
    }

    if (reverse === true) {
        return (d: ComputedRangeDatum) => {
            const y = scale(d.v0)
            const h = scale(d.v1) - y

            return { x: 0, y, width: height, height: h }
        }
    }

    return (d: ComputedRangeDatum) => {
        const y = scale(d.v1)
        const h = scale(d.v0) - y

        return { x: 0, y, width: height, height: h }
    }
}

export const computeRects = ({
    data,
    layout,
    reverse,
    scale,
    height,
}: Pick<BulletRectsProps, 'data'> & ComputeRect) => {
    const computeRect = getComputeRect({
        layout,
        reverse,
        scale,
        height,
    })

    return data.map(d => ({
        data: d,
        ...computeRect(d),
    }))
}
