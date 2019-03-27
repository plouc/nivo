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
import { ResponsiveChoroplethCanvas, ChoroplethCanvasDefaultProps } from '@nivo/geo'
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

    colors: 'PiYG',
    unknownColor: '#101b42',

    label: 'properties.name',
    value: 'value',
    valueFormat: '.2s',

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#101b42',

    borderWidth: 0.5,
    borderColor: '#101b42',

    isInteractive: true,
    'custom tooltip example': false,

    legends: [
        {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -60,
            itemsSpacing: 0,
            itemWidth: 86,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#e6f6cf',
            itemOpacity: 0.85,
            symbolSize: 18,
        },
    ],

    theme: {
        ...nivoTheme,
        background: '#1f294a',
    },
}

const ChoroplethCanvas = () => {
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
        'ResponsiveChoroplethCanvas',
        {
            features: [],
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/geo',
            defaults: ChoroplethCanvasDefaultProps,
        }
    )

    const header = (
        <ChartHeader chartClass="ChoroplethCanvas" tags={['@nivo/geo', 'map', 'canvas']} />
    )

    const description = (
        <div className="chart-description">
            <p className="description">
                A canvas implementation of the <Link to="/choropleth">Choropleth</Link> component,
                should be used used when you have complex geometries as it offers better performance
                than its SVG counterpart.
            </p>
            <p className="description">
                The responsive alternative of this component is <code>ResponsiveChoropleth</code>.
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
                    <ResponsiveChoroplethCanvas
                        features={countries.features}
                        data={data}
                        onClick={onClick}
                        {...mappedSettings}
                    />
                </ChartTabs>
                <GeoControls scope="ChoroplethCanvas" settings={settings} onChange={setSettings} />
                <ComponentPropsDocumentation
                    chartClass="ChoroplethCanvas"
                    properties={properties}
                />
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

export default ChoroplethCanvas
