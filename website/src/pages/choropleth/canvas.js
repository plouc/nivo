/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveChoroplethCanvas, ChoroplethCanvasDefaultProps } from '@nivo/geo'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/choropleth/meta.yml'
import mapper from '../../data/components/geo/mapper'
import { groups } from '../../data/components/choropleth/props'
import { generateChoroplethData } from '../../data/components/geo/generator'
import countries from '../../data/components/geo/world_countries'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialProperties = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    colors: 'RdBu',
    domain: [0, 1000000],
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
    graticuleLineColor: 'rgba(0, 0, 0, .2)',

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
            itemWidth: 92,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 18,
        },
    ],
}

const ChoroplethCanvas = () => {
    return (
        <ComponentTemplate
            name="ChoroplethCanvas"
            meta={meta.ChoroplethCanvas}
            icon="choropleth"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={ChoroplethCanvasDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                features: '/* please have a look at the description for usage */',
                ...properties,
                tooltip: properties.tooltip ? Tooltip : undefined,
            })}
            generateData={generateChoroplethData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveChoroplethCanvas
                        features={countries.features}
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={feature => {
                            logAction({
                                type: 'click',
                                label: `${feature.label}: ${feature.formattedValue} (${feature.id})`,
                                color: feature.color,
                                data: {
                                    label: feature.label,
                                    value: feature.value,
                                    formattedValue: feature.formattedValue,
                                    data: feature.data,
                                },
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ChoroplethCanvas
