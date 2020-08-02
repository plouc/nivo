/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ParallelCoordinates } from '@nivo/parallel-coordinates'
import parallelCoordinatesLightNeutralImg from '../../assets/icons/parallel-coordinates-light-neutral.png'
import parallelCoordinatesLightColoredImg from '../../assets/icons/parallel-coordinates-light-colored.png'
import parallelCoordinatesDarkNeutralImg from '../../assets/icons/parallel-coordinates-dark-neutral.png'
import parallelCoordinatesDarkColoredImg from '../../assets/icons/parallel-coordinates-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = (lineColor, axisColor) => ({
    width: ICON_SIZE,
    height: ICON_SIZE,
    colors: [lineColor],
    theme: {
        axis: {
            domain: {
                line: {
                    stroke: axisColor,
                    strokeWidth: 8,
                },
            },
            ticks: {
                line: {
                    strokeWidth: 0,
                },
                text: {
                    fill: 'transparent',
                },
            },
        },
    },
    margin: {
        top: 8,
        right: 4,
        bottom: 8,
        left: 4,
    },
    strokeWidth: 2,
    lineOpacity: 1,
    variables: [
        {
            key: 'A',
            type: 'linear',
            min: 0,
            max: 100,
        },
        {
            key: 'B',
            type: 'linear',
            min: 0,
            max: 100,
        },
        {
            key: 'C',
            type: 'linear',
            min: 0,
            max: 100,
        },
        {
            key: 'D',
            type: 'linear',
            min: 0,
            max: 100,
        },
    ],
    data: [
        {
            A: 8,
            B: 8,
            C: 36,
            D: 36,
        },
        {
            A: 23,
            B: 23,
            C: 8,
            D: 8,
        },
        {
            A: 28,
            B: 28,
            C: 52,
            D: 52,
        },
        {
            A: 50,
            B: 50,
            C: 82,
            D: 82,
        },
        {
            A: 92,
            B: 92,
            C: 46,
            D: 46,
        },
    ],
    isInteractive: false,
    animate: false,
})

const ParallelCoordinatesIconItem = ({ type }) => (
    <Icon id={`parallel-coordinates-${type}`} type={type}>
        <ParallelCoordinates {...chartProps(colors[type].colors[1], colors[type].colors[4])} />
    </Icon>
)

const ParallelCoordinatesIcon = () => (
    <>
        <ParallelCoordinatesIconItem type="lightNeutral" />
        <IconImg url={parallelCoordinatesLightNeutralImg} />
        <ParallelCoordinatesIconItem type="lightColored" />
        <IconImg url={parallelCoordinatesLightColoredImg} />
        <ParallelCoordinatesIconItem type="darkNeutral" />
        <IconImg url={parallelCoordinatesDarkNeutralImg} />
        <ParallelCoordinatesIconItem type="darkColored" />
        <IconImg url={parallelCoordinatesDarkColoredImg} />
    </>
)

export default ParallelCoordinatesIcon
