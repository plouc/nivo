import React from 'react'
import { usePieRadialLabels } from './hooks'
import { RadialLabel } from './RadialLabel'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface RadialLabelsProps<RawDatum> {
    dataWithArc: ComputedDatum<RawDatum>[]
    label: CompletePieSvgProps<RawDatum>['radialLabel']
    skipAngle: CompletePieSvgProps<RawDatum>['radialLabelsSkipAngle']
    radius: number
    linkOffset: CompletePieSvgProps<RawDatum>['radialLabelsLinkOffset']
    linkDiagonalLength: CompletePieSvgProps<RawDatum>['radialLabelsLinkDiagonalLength']
    linkHorizontalLength: CompletePieSvgProps<RawDatum>['radialLabelsLinkHorizontalLength']
    linkStrokeWidth: CompletePieSvgProps<RawDatum>['radialLabelsLinkStrokeWidth']
    textXOffset: CompletePieSvgProps<RawDatum>['radialLabelsTextXOffset']
    textColor: CompletePieSvgProps<RawDatum>['radialLabelsTextColor']
    linkColor: CompletePieSvgProps<RawDatum>['radialLabelsLinkColor']
}

export const RadialLabels = <RawDatum,>({
    dataWithArc,
    label,
    radius,
    skipAngle,
    linkOffset,
    linkDiagonalLength,
    linkHorizontalLength,
    linkStrokeWidth,
    textXOffset,
    textColor,
    linkColor,
}: RadialLabelsProps<RawDatum>) => {
    const radialLabels = usePieRadialLabels<RawDatum>({
        enable: true,
        dataWithArc,
        label,
        textXOffset,
        textColor,
        radius,
        skipAngle,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        linkColor,
    })

    return (
        <>
            {radialLabels.map(labelData => (
                <RadialLabel
                    key={labelData.datum.id}
                    label={labelData}
                    linkStrokeWidth={linkStrokeWidth}
                />
            ))}
        </>
    )
}
