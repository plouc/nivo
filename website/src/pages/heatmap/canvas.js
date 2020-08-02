/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap'
import isFunction from 'lodash/isFunction'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'
import { generateHeavyDataSet } from '../../data/components/heatmap/generator'

const initialProperties = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 100,
        left: 60,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    minValue: 'auto',
    maxValue: 'auto',
    forceSquare: false,
    sizeVariation: 0,
    padding: 0,
    colors: 'BrBG',

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
        enable: true,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 40,
    },
    axisBottom: {
        enable: true,
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
    enableGridY: true,

    cellShape: 'rect',
    cellOpacity: 1,
    cellBorderWidth: 0,
    cellBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },

    enableLabels: false,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.4]],
    },

    animate: true,
    motionStiffness: 120,
    motionDamping: 9,

    isInteractive: true,
    hoverTarget: 'rowColumn',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.5,
}

const HeatMapCanvas = () => {
    return (
        <ComponentTemplate
            name="HeatMapCanvas"
            meta={meta.HeatMapCanvas}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                cellShape: isFunction(properties.cellShape)
                    ? 'Custom(props) => (…)'
                    : properties.cellShape,
            })}
            generateData={generateHeavyDataSet}
            getDataSize={data => data.data.length * data.keys.length}
            getTabData={data => data.data}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMapCanvas
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

export default HeatMapCanvas
