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
import { ResponsiveChoropleth, ChoroplethDefaultProps } from '@nivo/geo'
import nivoTheme from '../../../nivoTheme'
import generateCode from '../../../lib/generateChartCode'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import GeoControls from './GeoControls'
import properties from './props'
import countries from './world_countries'
import { generateChoroplethData } from './generators'
import propsMapper from './propsMapper'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialSettings = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    colors: 'YlGnBu',
    unknownColor: '#152538',

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#152538',

    borderWidth: 0.5,
    borderColor: '#152538',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    theme: {
        ...nivoTheme,
        background: '#223346',
    },
}

const Choropleth = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateChoroplethData())
    const onClick = useCallback((feature, event) => {
        alert(
            `${feature.properties.name} (${feature.id})\nclicked at x: ${event.clientX}, y: ${
                event.clientY
            }`
        )
    })
    const diceRoll = useCallback(() => setData(generateChoroplethData()), [setData])

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveChoropleth',
        {
            features: [],
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/geo',
            defaults: ChoroplethDefaultProps,
        }
    )

    const header = (
        <ChartHeader chartClass="Choropleth" tags={['@nivo/geo', 'map', 'svg', 'isomorphic']} />
    )

    const description = (
        <div className="chart-description">
            <p className="description">
                The Choropleth component displays divided geographical areas shaded in relation to
                some data variable. It's build on top of the <Link to="/geomap">GeoMap</Link>{' '}
                component.
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
                Like for <Link to="/geomap">GeoMap</Link>, you must pass an array of features which
                determine the geometries to render on the map, then you pass an array of data which,
                each datum is merged with its corresponding feature using the <code>match</code>{' '}
                property, the value is picked according to the <code>value</code> accessor.
            </p>
            <p className="description">
                The responsive alternative of this component is <code>ResponsiveChoropleth</code>.
                This component also have a canvas implementations,{' '}
                <Link to="/choropleth/canvas">ChoroplethCanvas</Link>, which should be used when you
                have complex geometries as it offers better performance.
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
                <ChartTabs chartClass="choropleth" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveChoropleth
                        features={countries.features}
                        data={data}
                        onClick={onClick}
                        {...mappedSettings}
                    />
                </ChartTabs>
                <GeoControls scope="Choropleth" settings={settings} onChange={setSettings} />
                <ComponentPropsDocumentation chartClass="Choropleth" properties={properties} />
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

export default Choropleth
