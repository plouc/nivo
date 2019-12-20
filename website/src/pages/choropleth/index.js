/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import omit from 'lodash/omit'
import { ResponsiveChoropleth, ChoroplethDefaultProps } from '@nivo/geo'
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
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    colors: 'nivo',
    domain: [0, 1000000],
    unknownColor: '#666666',

    label: 'properties.name',
    value: 'value',
    valueFormat: '.2s',

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#dddddd',

    borderWidth: 0.5,
    borderColor: '#152538',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
}

const Choropleth = () => {
    return (
        <ComponentTemplate
            name="Choropleth"
            meta={meta.Choropleth}
            icon="choropleth"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={ChoroplethDefaultProps}
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
                    <ResponsiveChoropleth
                        features={countries.features}
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={feature => {
                            logAction({
                                type: 'click',
                                label: `${feature.label}: ${feature.formattedValue} (${feature.id})`,
                                color: feature.color,
                                data: omit(feature, 'geometry'),
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Choropleth
