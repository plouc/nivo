/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { usePieRadialLabels } from './hooks'
import { RadialLabel } from './RadialLabel'
import { ComputedDatum, CompletePieSvgProps } from './definitions'

interface RadialLabelsProps<R> {
    dataWithArc: ComputedDatum<R>[]
    label: CompletePieSvgProps<R>['radialLabel']
    skipAngle: CompletePieSvgProps<R>['radialLabelsSkipAngle']
    radius: number
    linkOffset: CompletePieSvgProps<R>['radialLabelsLinkOffset']
    linkDiagonalLength: CompletePieSvgProps<R>['radialLabelsLinkDiagonalLength']
    linkHorizontalLength: CompletePieSvgProps<R>['radialLabelsLinkHorizontalLength']
    linkStrokeWidth: CompletePieSvgProps<R>['radialLabelsLinkStrokeWidth']
    textXOffset: CompletePieSvgProps<R>['radialLabelsTextXOffset']
    textColor: CompletePieSvgProps<R>['radialLabelsTextColor']
    linkColor: CompletePieSvgProps<R>['radialLabelsLinkColor']
}

// prettier-ignore
export const RadialLabels = <R, >({
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
}: RadialLabelsProps<R>) => {
    const radialLabels = usePieRadialLabels<R>({
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
                <RadialLabel key={labelData.datum.id} label={labelData} linkStrokeWidth={linkStrokeWidth} />
            ))}
        </>
    )
}
