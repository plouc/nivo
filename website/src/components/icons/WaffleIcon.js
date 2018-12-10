/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Waffle } from '@nivo/waffle'
import waffleGreyImg from '../../assets/icons/waffle-grey.png'
import waffleRedImg from '../../assets/icons/waffle-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
    total: 12,
    columns: 3,
    rows: 4,
    margin: {
        top: 5,
        bottom: 5,
    },
    padding: 2,
    data: [{ id: 'A', label: 'A', value: 8 }, { id: 'B', label: 'B', value: 4 }],
    isInteractive: false,
}

const WaffleIcon = () => (
    <Fragment>
        <Icon id="waffle-grey">
            <Waffle
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#767676', '#cbcbcb']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${waffleGreyImg})`,
            }}
        />
        <Icon id="waffle-red">
            <Waffle
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#e2462f', '#ffb8b5']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${waffleRedImg})`,
            }}
        />
    </Fragment>
)

export default WaffleIcon
