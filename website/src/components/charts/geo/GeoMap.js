/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveGeoMap, GeoMapDefaultProps } from '@nivo/geo'
import nivoTheme from '../../../nivoTheme'
import generateCode from '../../../lib/generateChartCode'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import GeoControls from './GeoControls'
import properties from './props'
import countries from './world_countries'
// import propsMapper from './propsMapper'

const initialSettings = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    fillColor: '#eeeeee',
    borderWidth: 0.5,
    borderColor: '#333333',

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#666666',

    isInteractive: true,

    theme: {
        ...nivoTheme,
        background: '#999999',
    },
}

const GeoMap = () => {
    const [settings, setSettings] = useState(initialSettings)
    const onClick = useCallback((feature, event) => {
        alert(
            `${feature.properties.name} (${feature.id})\nclicked at x: ${event.clientX}, y: ${
                event.clientY
            }`
        )
    })

    // const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveGeoMap',
        {
            features: [],
            ...settings,
        },
        {
            pkg: '@nivo/geo',
            defaults: GeoMapDefaultProps,
        }
    )

    const header = (
        <ChartHeader chartClass="GeoMap" tags={['@nivo/geo', 'map', 'svg', 'isomorphic']} />
    )

    const description = (
        <div className="chart-description">
            <p className="description">
                This component can be used to draw maps, it takes an array of features which
                determine the geometries to render on the map. It can be used to build more complex
                maps such as the <Link to="/choropleth">Choropleth</Link>.
            </p>
            <p className="description">
                Using this component requires some knowledge about the <code>d3-geo</code> library,
                projections, geoJSON… please have a loot at the{' '}
                <a href="https://github.com/d3/d3-geo" target="_blank" rel="noopener noreferrer">
                    official d3 documentation
                </a>{' '}
                for further information.
            </p>
            <p className="description">
                The responsive alternative of this component is <code>ResponsiveGeoMap</code>, it
                also offers a canvas implementations, see{' '}
                <Link to="/geomap/canvas">GeoMapCanvas</Link>.
            </p>
        </div>
    )

    return (
        <div className="page_content grid">
            <div className="chart-page_main">
                <MediaQuery query="(max-width: 1000px)">
                    {header}
                    {description}
                </MediaQuery>
                <ChartTabs chartClass="geomap" code={code}>
                    <ResponsiveGeoMap
                        features={countries.features}
                        onClick={onClick}
                        {...settings}
                    />
                </ChartTabs>
                <GeoControls scope="GeoMap" settings={settings} onChange={setSettings} />
                <ComponentPropsDocumentation chartClass="GeoMap" properties={properties} />
            </div>
            <div className="chart-page_aside">
                <MediaQuery query="(min-width: 1000px)">
                    {header}
                    {description}
                </MediaQuery>
            </div>
        </div>
    )
}

export default GeoMap
