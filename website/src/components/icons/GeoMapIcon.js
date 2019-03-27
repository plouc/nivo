/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import geomapGreyImg from '../../assets/icons/geomap-grey.png'
import geomapRedImg from '../../assets/icons/geomap-red.png'
import { Icon } from './styled'
import MapIcon from './MapIcon'

const GeoMapIcon = () => (
    <>
        <Icon id="geomap-grey">
            <MapIcon stroke="#686868" fill="#e2e2e2" />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${geomapGreyImg})`,
            }}
        />
        <Icon id="geomap-red">
            <MapIcon stroke="#d45036" fill="#ffc6c4" />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${geomapRedImg})`,
            }}
        />
    </>
)

export default GeoMapIcon
