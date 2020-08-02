/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Line } from '@nivo/line'
import lineLightNeutralImg from '../../assets/icons/line-light-neutral.png'
import lineLightColoredImg from '../../assets/icons/line-light-colored.png'
import lineDarkNeutralImg from '../../assets/icons/line-dark-neutral.png'
import lineDarkColoredImg from '../../assets/icons/line-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    margin: {
        top: 24,
        right: 5,
        bottom: 12,
        left: 5,
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 100,
    },
    enableGridX: false,
    enableGridY: false,
    lineWidth: 5,
    pointSize: 10,
    data: [
        {
            id: 'A',
            data: [
                { x: 0, y: 60 },
                { x: 1, y: 34 },
                { x: 2, y: 56 },
                { x: 3, y: 28 },
                { x: 4, y: 40 },
            ],
        },
        {
            id: 'B',
            data: [
                { x: 0, y: 16 },
                { x: 1, y: 74 },
                { x: 2, y: 26 },
                { x: 3, y: 88 },
                { x: 4, y: 100 },
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

const LineIconItem = ({ type }) => (
    <Icon id={`line-${type}`} type={type}>
        <Line
            {...chartProps}
            colors={[colors[type].colors[2], colors[type].colors[4]]}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors[type].colors[3],
                            strokeWidth: 3,
                            strokeLinecap: 'square',
                        },
                    },
                },
            }}
        />
    </Icon>
)

const LineIcon = () => (
    <>
        <LineIconItem type="lightNeutral" />
        <IconImg url={lineLightNeutralImg} />
        <LineIconItem type="lightColored" />
        <IconImg url={lineLightColoredImg} />
        <LineIconItem type="darkNeutral" />
        <IconImg url={lineDarkNeutralImg} />
        <LineIconItem type="darkColored" />
        <IconImg url={lineDarkColoredImg} />
    </>
)

export default LineIcon
