/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Line } from '@nivo/line'
import lineGreyImg from '../../assets/icons/line-grey.png'
import lineRedImg from '../../assets/icons/line-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
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
    dotSize: 10,
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

const LineIcon = () => (
    <Fragment>
        <Icon id="line-grey">
            <Line
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#989898', '#686868']}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: '#828282',
                                strokeWidth: 3,
                                strokeLinecap: 'square',
                            },
                        },
                    },
                }}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${lineGreyImg})`,
            }}
        />
        <Icon id="line-red">
            <Line
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#ff745d', '#e54127']}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: '#ef634e',
                                strokeWidth: 3,
                                strokeLinecap: 'square',
                            },
                        },
                    },
                }}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${lineRedImg})`,
            }}
        />
    </Fragment>
)

export default LineIcon
