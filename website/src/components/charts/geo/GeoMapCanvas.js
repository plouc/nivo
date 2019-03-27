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
import { ResponsiveGeoMapCanvas, GeoMapCanvasDefaultProps } from '@nivo/geo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import GeoControls from './GeoControls'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import nivoTheme from '../../../nivoTheme'
import properties from './props'
import countries from './world_countries'
// import propsMapper from './propsMapper'

const initialSettings = {
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

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

const GeoMapCanvas = () => {
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
        'ResponsiveGeoMapCanvas',
        {
            features: [],
            ...settings,
        },
        {
            pkg: '@nivo/geo',
            defaults: GeoMapCanvasDefaultProps,
        }
    )

    const header = <ChartHeader chartClass="GeoMapCanvas" tags={['@nivo/geo', 'map', 'canvas']} />

    const description = (
        <div className="chart-description">
            <p className="description">
                A canvas implementation of the <Link to="/geomap">GeoMap</Link> component, should be
                used used when you have complex geometries as it offers better performance than its
                SVG counterpart.
            </p>
            <p className="description">
                The responsive alternative of this component is <code>ResponsiveGeoMap</code>.
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
                    <ResponsiveGeoMapCanvas
                        features={countries.features}
                        onClick={onClick}
                        {...settings}
                    />
                </ChartTabs>
                <GeoControls scope="GeoMapCanvas" settings={settings} onChange={setSettings} />
                <ComponentPropsDocumentation chartClass="GeoMapCanvas" properties={properties} />
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

export default GeoMapCanvas
