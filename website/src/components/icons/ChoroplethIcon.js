/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Choropleth } from '@nivo/geo'
import choroplethGreyImg from '../../assets/icons/choropleth-grey.png'
import choroplethRedImg from '../../assets/icons/choropleth-red.png'
import { ICON_SIZE, Icon } from './styled'
import world from '../charts/geo/world_countries'

const includeCountries = ['DZA', 'NER', 'BFA', 'MLI', 'MRT']
const features = world.features.filter(f => includeCountries.includes(f.id))

const data = [
    { id: 'DZA', value: 3 },
    { id: 'NER', value: 6 },
    { id: 'BFA', value: 1 },
    { id: 'MLI', value: 12 },
    { id: 'MRT', value: 7 },
    { id: 'COD', value: 9 },
]

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    features,
    data,
    projectionScale: 166,
    projectionTranslation: [0.8, 1.2],
    isInteractive: false,
    borderWidth: 1,
}

const ChoroplethIcon = () => (
    <Fragment>
        <Icon
            id="choropleth-grey"
            style={{
                position: 'relative',
            }}
        >
            <Choropleth {...chartProps} borderColor="#686868" borderWidth={6} />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <Choropleth
                    {...chartProps}
                    borderWidth={0}
                    colors={['#ddd', '#bbb', '#999', '#777']}
                />
            </div>
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${choroplethGreyImg})`,
            }}
        />
        <Icon
            id="choropleth-red"
            style={{
                position: 'relative',
            }}
        >
            <Choropleth {...chartProps} borderColor="#d45036" borderWidth={6} />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <Choropleth
                    {...chartProps}
                    borderWidth={0}
                    colors={['#ffb8b4', '#ff8b7d', '#ff5c3e']}
                />
            </div>
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${choroplethRedImg})`,
            }}
        />
    </Fragment>
)

export default ChoroplethIcon
