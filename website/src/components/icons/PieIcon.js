/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Pie } from '@nivo/pie'
import pieGreyImg from '../../assets/icons/pie-grey.png'
import pieRedImg from '../../assets/icons/pie-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
    data: [
        { id: '0', label: '0', value: 45 },
        { id: '1', label: '1', value: 90 },
        { id: '2', label: '2', value: 225 },
    ],
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    innerRadius: 0.6,
    padAngle: 2.5,
    enableRadialLabels: false,
    enableSlicesLabels: false,
    isInteractive: false,
}

const PieIcon = () => (
    <Fragment>
        <Icon id="pie-grey">
            <Pie
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#686868', '#838383', '#989898']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${pieGreyImg})`,
            }}
        />
        <Icon id="pie-red">
            <Pie
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#e54127', '#ff5d45', '#ff745d']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${pieRedImg})`,
            }}
        />
    </Fragment>
)

export default PieIcon
