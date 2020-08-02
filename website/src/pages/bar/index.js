/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveBar, BarDefaultProps } from '@nivo/bar'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bar/meta.yml'
import { generateLightDataSet } from '../../data/components/bar/generator'
import mapper from '../../data/components/bar/mapper'
import { groups } from '../../data/components/bar/props'

const Tooltip = () => {
    /* return custom tooltip */
}

const initialProperties = {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
    },

    padding: 0.3,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    colors: { scheme: 'nivo' },
    colorBy: 'id',
    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        }),
        patternLinesDef('lines', {
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        }),
    ],
    fill: [
        { match: { id: 'fries' }, id: 'dots' },
        { match: { id: 'sandwich' }, id: 'lines' },
    ],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1.6]],
    },

    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: true,

    enableLabel: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.6]],
    },

    legends: [
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}

const Bar = () => {
    return (
        <ComponentTemplate
            name="Bar"
            meta={meta.Bar}
            icon="bar"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={BarDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                tooltip: properties.tooltip ? Tooltip : undefined,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBar
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[bar] ${node.id} - ${node.indexValue}: ${node.value}`,
                                color: node.color,
                                data: node,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Bar
