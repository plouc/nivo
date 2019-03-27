/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import choroplethGreyImg from '../../assets/icons/choropleth-grey.png'
import choroplethRedImg from '../../assets/icons/choropleth-red.png'
import { Icon } from './styled'
import MapIcon from './MapIcon'

const ChoroplethIcon = () => (
    <>
        <Icon id="choropleth-grey">
            <MapIcon
                stroke="#686868"
                fill="#e2e2e2"
                colors={[
                    '#b0aeaf',
                    '#c3c3c3',
                    '#e2e2e2',
                    '#909090',
                    '#e2e2e2',
                    '#b0aeaf',
                    '#c3c3c3',
                    '#adadad',
                    '#909090',
                    '#e2e2e2',
                    '#b0aeaf',
                    '#c3c3c3',
                    '#adadad',
                ]}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${choroplethGreyImg})`,
            }}
        />
        <Icon id="choropleth-red">
            <MapIcon
                stroke="#d45036"
                fill="#ffc6c4"
                colors={[
                    '#ff5c3e',
                    '#ff8c7d',
                    '#ffc6c4',
                    '#ff6b5a',
                    '#ffc6c4',
                    '#ff5c3e',
                    '#ff8c7d',
                    '#ff8c7d',
                    '#ff6b5a',
                    '#ffc6c4',
                    '#ff5c3e',
                    '#ff8c7d',
                    '#ff8c7d',
                ]}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${choroplethRedImg})`,
            }}
        />
    </>
)

export default ChoroplethIcon
