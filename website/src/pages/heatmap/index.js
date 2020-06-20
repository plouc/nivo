/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveHeatMap, HeatMapDefaultProps } from '@nivo/heatmap'
import { patternLinesDef } from '@nivo/core'
import isFunction from 'lodash/isFunction'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'
import { generateLightDataSet } from '../../data/components/heatmap/generator'

const initialProperties = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 60,
        left: 60,
    },

    minValue: 'auto',
    maxValue: 'auto',
    forceSquare: true,
    sizeVariation: 0,
    padding: 0,
    colors: 'nivo',

    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 40,
    },
    axisBottom: {
        enable: false,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: false,

    cellShape: 'rect',
    cellOpacity: 1,
    cellBorderWidth: 0,
    cellBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },

    enableLabels: true,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.8]],
    },

    defs: [
        patternLinesDef('lines', {
            background: 'inherit',
            color: 'rgba(0, 0, 0, 0.1)',
            rotation: -45,
            lineWidth: 4,
            spacing: 7,
        }),
    ],
    fill: [{ match: d => false && d.value < 30, id: 'lines' }],

    animate: true,
    motionConfig: 'wobbly',
    motionStiffness: 80,
    motionDamping: 9,

    isInteractive: true,
    hoverTarget: 'cell',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.25,
}

const HeatMap = () => {
    return (
        <ComponentTemplate
            name="HeatMap"
            meta={meta.HeatMap}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={HeatMapDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                cellShape: isFunction(properties.cellShape)
                    ? 'Custom(props) => (…)'
                    : properties.cellShape,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMap
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        onClick={cell => {
                            logAction({
                                type: 'click',
                                label: `[cell] ${cell.yKey}.${cell.xKey}: ${cell.value}`,
                                color: cell.color,
                                data: cell,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default HeatMap
