/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveBarCanvas } from '@nivo/bar'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bar/meta.yml'
import { generateHeavyDataSet } from '../../data/components/bar/generator'
import mapper from '../../data/components/bar/mapper'
import { groups } from '../../data/components/bar/props'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialProperties = {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padding: 0.15,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'horizontal',
    reverse: false,

    colors: { scheme: 'red_blue' },
    colorBy: 'id',
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1.6]],
    },

    axisTop: {
        enable: true,
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
        legendOffset: 36,
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

    enableGridX: true,
    enableGridY: false,

    enableLabel: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.6]],
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
}

const BarCanvas = () => {
    return (
        <ComponentTemplate
            name="BarCanvas"
            meta={meta.BarCanvas}
            icon="bar"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                tooltip: properties.tooltip ? Tooltip : undefined,
            })}
            generateData={generateHeavyDataSet}
            getTabData={data => data.data}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBarCanvas
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

export default BarCanvas
