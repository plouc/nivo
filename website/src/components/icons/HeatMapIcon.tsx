import React from 'react'
import { HeatMap, HeatMapSvgProps } from '@nivo/heatmap'
import heatmapLightNeutralImg from '../../assets/icons/heatmap-light-neutral.png'
import heatmapLightColoredImg from '../../assets/icons/heatmap-light-colored.png'
import heatmapDarkNeutralImg from '../../assets/icons/heatmap-dark-neutral.png'
import heatmapDarkColoredImg from '../../assets/icons/heatmap-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    x: string
    y: number
}

const chartProps: HeatMapSvgProps<Datum, Record<string, unknown>> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        {
            id: '0',
            data: [
                { x: 'A', y: 4 },
                { x: 'B', y: 3 },
                { x: 'C', y: 2 },
            ],
        },
        {
            id: '1',
            data: [
                { x: 'A', y: 3 },
                { x: 'B', y: 2 },
                { x: 'C', y: 1 },
            ],
        },
        {
            id: '2',
            data: [
                { x: 'A', y: 2 },
                { x: 'B', y: 1 },
                { x: 'C', y: 0 },
            ],
        },
    ],
    margin: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
    },
    axisTop: null,
    axisLeft: null,
    enableLabels: false,
    xOuterPadding: 0.14,
    xInnerPadding: 0.14,
    yOuterPadding: 0.14,
    yInnerPadding: 0.14,
    isInteractive: false,
    animate: false,
}

const HeatMapIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`heatmap-${type}`} type={type}>
        <HeatMap<Datum, Record<string, unknown>>
            {...chartProps}
            colors={{
                type: 'quantize',
                colors: colors[type].colors,
            }}
        />
    </Icon>
)

export const HeatMapIcon = () => (
    <>
        <HeatMapIconItem type="lightNeutral" />
        <IconImg url={heatmapLightNeutralImg} />
        <HeatMapIconItem type="lightColored" />
        <IconImg url={heatmapLightColoredImg} />
        <HeatMapIconItem type="darkNeutral" />
        <IconImg url={heatmapDarkNeutralImg} />
        <HeatMapIconItem type="darkColored" />
        <IconImg url={heatmapDarkColoredImg} />
    </>
)
