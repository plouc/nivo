import React, { useMemo } from 'react'
import { BoxPlot, BoxPlotSvgProps } from '@nivo/boxplot'
import boxplotLightNeutralImg from '../../assets/icons/boxplot-light-neutral.png'
import boxplotLightColoredImg from '../../assets/icons/boxplot-light-colored.png'
import boxplotDarkNeutralImg from '../../assets/icons/boxplot-dark-neutral.png'
import boxplotDarkColoredImg from '../../assets/icons/boxplot-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const quantiles = [0.1, 0.25, 0.5, 0.75, 0.9]

const chartProps: BoxPlotSvgProps<any> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    layout: 'horizontal',
    margin: {
        top: 6,
        right: 2,
        bottom: 6,
        left: 2,
    },
    padding: 0.15,
    enableGridX: false,
    enableGridY: false,
    axisTop: null,
    axisRight: null,
    axisBottom: null,
    axisLeft: null,
    // Using pre-computed data for predictability.
    data: [
        {
            group: 'A',
            subGroup: '',
            quantiles: quantiles,
            values: [1.5, 2.2, 2.9, 3.6, 4.3],
            extrema: [1, 5],
            mean: 2.5,
            n: 100,
        },
        {
            group: 'B',
            subGroup: '',
            quantiles: quantiles,
            values: [2, 2.5, 3.7, 4.5, 5],
            extrema: [2, 7],
            mean: 3.75,
            n: 200,
        },
        {
            group: 'C',
            subGroup: '',
            quantiles: quantiles,
            values: [1, 1.5, 2, 2.5, 3],
            extrema: [2, 7],
            mean: 3.75,
            n: 200,
        },
    ],
    medianWidth: 2,
    whiskerWidth: 3,
    whiskerEndSize: .6,
    borderRadius: 2,
    isInteractive: false,
    animate: false,
}

const BoxPlotIconItem = ({ type }: { type: IconType }) => {
    const typedColors = useMemo(
        () => [colors[type].colors[1], colors[type].colors[2], colors[type].colors[4]],
        [type]
    )

    return (
        <Icon id={`boxplot-${type}`} type={type}>
            <BoxPlot<any>
                {...chartProps}
                colors={[typedColors[1]]}
                medianColor={typedColors[2]}
                whiskerColor={typedColors[2]}
            />
        </Icon>
    )
}

export const BoxPlotIcon = () => (
    <>
        <BoxPlotIconItem type="lightNeutral" />
        <IconImg url={boxplotLightNeutralImg} />
        <BoxPlotIconItem type="lightColored" />
        <IconImg url={boxplotLightColoredImg} />
        <BoxPlotIconItem type="darkNeutral" />
        <IconImg url={boxplotDarkNeutralImg} />
        <BoxPlotIconItem type="darkColored" />
        <IconImg url={boxplotDarkColoredImg} />
    </>
)
