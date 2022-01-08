import React, { useMemo } from 'react'
import { Theme } from '@nivo/core'
import { ScatterPlot, ScatterPlotSvgProps } from '@nivo/scatterplot'
import scatterPlotLightNeutralImg from '../../assets/icons/scatterplot-light-neutral.png'
import scatterPlotLightColoredImg from '../../assets/icons/scatterplot-light-colored.png'
import scatterPlotDarkNeutralImg from '../../assets/icons/scatterplot-dark-neutral.png'
import scatterPlotDarkColoredImg from '../../assets/icons/scatterplot-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    x: number
    y: number
}

const chartProps: ScatterPlotSvgProps<Datum> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    margin: {
        top: 24,
        right: 5,
        bottom: 12,
        left: 5,
    },
    xScale: {
        type: 'linear',
        min: 0,
        max: 9,
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 100,
    },
    enableGridX: false,
    enableGridY: false,
    nodeSize: 7,
    data: [
        {
            id: 'A',
            data: [
                { x: 1, y: 30 },
                { x: 2, y: 56 },
                { x: 3, y: 64 },
                { x: 4, y: 58 },
                { x: 5, y: 34 },
                { x: 6, y: 60 },
                { x: 7, y: 90 },
                { x: 8, y: 98 },
            ],
        },
        {
            id: 'B',
            data: [
                { x: 1, y: 13 },
                { x: 2, y: 42 },
                { x: 3, y: 47 },
                { x: 4, y: 43 },
                { x: 5, y: 50 },
                { x: 6, y: 74 },
                { x: 7, y: 77 },
                { x: 8, y: 86 },
            ],
        },
        {
            id: 'C',
            data: [
                { x: 2, y: 29 },
                { x: 3, y: 26 },
                { x: 4, y: 73 },
                { x: 5, y: 64 },
                { x: 6, y: 46 },
                { x: 7, y: 54 },
                { x: 8, y: 72 },
            ],
        },
    ],
    isInteractive: false,
    axisLeft: {
        tickSize: 0,
        tickPadding: 100,
    },
    axisBottom: {
        tickSize: 0,
        tickPadding: 100,
    },
}

const ScatterPlotIconItem = ({ type }: { type: IconType }) => {
    const theme: Theme = useMemo(
        () => ({
            axis: {
                domain: {
                    line: {
                        stroke: colors[type].colors[3],
                        strokeWidth: 3,
                        strokeLinecap: 'square',
                    },
                },
            },
        }),
        [type]
    )

    return (
        <Icon id={`scatterplot-${type}`} type={type}>
            <ScatterPlot
                {...chartProps}
                colors={[colors[type].colors[4], colors[type].colors[2], colors[type].colors[1]]}
                theme={theme}
            />
        </Icon>
    )
}

export const ScatterPlotIcon = () => (
    <>
        <ScatterPlotIconItem type="lightNeutral" />
        <IconImg url={scatterPlotLightNeutralImg} />
        <ScatterPlotIconItem type="lightColored" />
        <IconImg url={scatterPlotLightColoredImg} />
        <ScatterPlotIconItem type="darkNeutral" />
        <IconImg url={scatterPlotDarkNeutralImg} />
        <ScatterPlotIconItem type="darkColored" />
        <IconImg url={scatterPlotDarkColoredImg} />
    </>
)
