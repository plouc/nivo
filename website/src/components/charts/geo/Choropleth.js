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
    unknownColor: '#ffffff',

    projectionType: 'mercator',
    projectionScale: 100,

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#222222',

    borderWidth: 0.5,
    borderColor: '#000000',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    theme: {
        ...nivoTheme,
        background: '#333333',
    },
}

const Choropleth = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateChoroplethData())
    const onClick = useCallback((feature, event) => {
        alert(`${feature.properties.name}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    })
    const diceRoll = useCallback(() => setData(generateChoroplethData()), [setData])

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveChoropleth',
        {
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/geo',
            defaults: ChoroplethDefaultProps,
        }
    )

    const header = (
        <ChartHeader chartClass="Choropleth" tags={['geo', 'map', 'svg', 'isomorphic']} />
    )

    const description = (
        <div className="chart-description">
            <p className="description">
                The responsive alternative of this component is <code>ResponsiveChoropleth</code>,
                it also offers a canvas implementations, see{' '}
                <Link to="/choropleth/canvas">ChoroplethCanvas</Link>.
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
