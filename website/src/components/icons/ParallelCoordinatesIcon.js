/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { ParallelCoordinates } from '@nivo/parallel-coordinates'
import parallelCoordinatesGreyImg from '../../assets/icons/parallel-coordinates-grey.png'
import parallelCoordinatesRedImg from '../../assets/icons/parallel-coordinates-red.png'
import { ICON_SIZE, Icon } from './styled'

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
})

const greyProps = chartProps('#b6b4b5', '#686868')
const redProps = chartProps('#ff7d67', '#e54127')

const ParallelCoordinatesIcon = () => (
    <Fragment>
        <Icon id="parallel-coordinates-grey">
            <ParallelCoordinates {...greyProps} />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${parallelCoordinatesGreyImg})`,
            }}
        />
        <Icon id="parallel-coordinates-red">
            <ParallelCoordinates {...redProps} />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${parallelCoordinatesRedImg})`,
            }}
        />
    </Fragment>
)

export default ParallelCoordinatesIcon
