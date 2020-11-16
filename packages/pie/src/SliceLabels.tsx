import React, { CSSProperties } from 'react'
import { useTheme } from '@nivo/core'
import { usePieSliceLabels } from './hooks'
import { CompletePieSvgProps, ComputedDatum } from './types'

const sliceStyle: CSSProperties = {
    pointerEvents: 'none',
}

interface SliceLabelsProps<RawDatum> {
    dataWithArc: ComputedDatum<RawDatum>[]
    label: CompletePieSvgProps<RawDatum>['sliceLabel']
    radiusOffset: CompletePieSvgProps<RawDatum>['sliceLabelsRadiusOffset']
    radius: number
    innerRadius: number
    skipAngle: CompletePieSvgProps<RawDatum>['sliceLabelsSkipAngle']
    textColor: CompletePieSvgProps<RawDatum>['sliceLabelsTextColor']
}

export const SliceLabels = <RawDatum,>({
    dataWithArc,
    label: labelAccessor,
    radius,
    innerRadius,
    radiusOffset,
    skipAngle,
    textColor,
}: SliceLabelsProps<RawDatum>) => {
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
