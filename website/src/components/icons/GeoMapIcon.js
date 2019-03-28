/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import geomapLightNeutralImg from '../../assets/icons/geomap-light-neutral.png'
import geomapLightColoredImg from '../../assets/icons/geomap-light-colored.png'
import geomapDarkNeutralImg from '../../assets/icons/geomap-dark-neutral.png'
import geomapDarkColoredImg from '../../assets/icons/geomap-dark-colored.png'
import { Icon, colors, IconImg } from './styled'
import MapIcon from './MapIcon'

const GeoMapIconItem = ({ type }) => (
    <Icon id={`geomap-${type}`} type={type}>
        <MapIcon stroke={colors[type].colors[4]} fill={colors[type].colors[0]} />
    </Icon>
)

const GeoMapIcon = () => (
    <>
        <GeoMapIconItem type="lightNeutral" />
        <IconImg url={geomapLightNeutralImg} />
        <GeoMapIconItem type="lightColored" />
        <IconImg url={geomapLightColoredImg} />
        <GeoMapIconItem type="darkNeutral" />
        <IconImg url={geomapDarkNeutralImg} />
        <GeoMapIconItem type="darkColored" />
        <IconImg url={geomapDarkColoredImg} />
    </>
)

export default GeoMapIcon
