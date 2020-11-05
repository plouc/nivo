import React, { CSSProperties } from 'react'
// @ts-ignore
import { useTheme } from '@nivo/core'
import { usePieSliceLabels } from './hooks'
import { CompletePieSvgProps, ComputedDatum } from './types'

const sliceStyle: CSSProperties = {
    pointerEvents: 'none',
}

interface SliceLabelsProps<R> {
    dataWithArc: ComputedDatum<R>[]
    label: CompletePieSvgProps<R>['sliceLabel']
    radiusOffset: CompletePieSvgProps<R>['sliceLabelsRadiusOffset']
    radius: number
    innerRadius: number
    skipAngle: CompletePieSvgProps<R>['sliceLabelsSkipAngle']
    textColor: CompletePieSvgProps<R>['sliceLabelsTextColor']
}

// prettier-ignore
export const SliceLabels = <R, >({
    dataWithArc,
    label: labelAccessor,
    radius,
    innerRadius,
    radiusOffset,
    skipAngle,
    textColor,
}: SliceLabelsProps<R>) => {
    const theme = useTheme()

    const labels = usePieSliceLabels({
        enable: true,
        dataWithArc,
        skipAngle,
        radius,
        innerRadius,
        radiusOffset,
        label: labelAccessor,
        textColor,
    })

    return (
        <>
            {labels.map(label => (
                <g
                    key={label.datum.id}
                    transform={`translate(${label.x}, ${label.y})`}
                    style={sliceStyle}
                >
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                            ...theme.labels.text,
                            fill: label.textColor,
                        }}
                    >
                        {label.label}
                    </text>
                </g>
            ))}
        </>
    )
}
