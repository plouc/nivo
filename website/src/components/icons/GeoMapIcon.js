/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { GeoMap } from '@nivo/geo'
import {} from 'd3-geo'
import geomapGreyImg from '../../assets/icons/geomap-grey.png'
import geomapRedImg from '../../assets/icons/geomap-red.png'
import { ICON_SIZE, Icon } from './styled'
import world from '../charts/geo/world_countries'

const includeCountries = ['DZA', 'NER', 'BFA', 'MLI', 'MRT']
const features = world.features.filter(f => includeCountries.includes(f.id))

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    features,
    projectionScale: 166,
    projectionTranslation: [0.8, 1.2],
    isInteractive: false,
    borderWidth: 1,
}

const GeoMapIcon = () => (
    <Fragment>
        <Icon
            id="geomap-grey"
            style={{
                position: 'relative',
            }}
        >
            <GeoMap {...chartProps} borderWidth={6} borderColor="#686868" />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <GeoMap {...chartProps} fillColor="#e2e2e2" borderColor="#686868" />
            </div>
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${geomapGreyImg})`,
            }}
        />
        <Icon
            id="geomap-red"
            style={{
                position: 'relative',
            }}
        >
            <GeoMap {...chartProps} borderWidth={6} borderColor="#d45036" />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <GeoMap {...chartProps} fillColor="#ffc6c5" borderColor="#d45036" />
            </div>
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${geomapRedImg})`,
            }}
        />
    </Fragment>
)

export default GeoMapIcon
