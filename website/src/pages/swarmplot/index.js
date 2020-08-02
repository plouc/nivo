/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveSwarmPlot, SwarmPlotDefaultProps } from '@nivo/swarmplot'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/swarmplot/meta.yml'
import mapper from '../../data/components/swarmplot/mapper'
import { groups } from '../../data/components/swarmplot/props'
import { generateLightDataSet } from '../../data/components/swarmplot/generator'

const initialProperties = Object.freeze({
    groupBy: 'group',
    identity: 'id',
    value: 'price',
    valueFormat: '$.2f',
    valueScale: {
        type: 'linear',
        min: 0,
        max: 500,
        reverse: false,
    },
    size: {
        key: 'volume',
        values: [4, 20],
        sizes: [6, 20],
    },
    spacing: 2,
    layout: SwarmPlotDefaultProps.layout,
    gap: SwarmPlotDefaultProps.gap,

    forceStrength: 4,
    simulationIterations: 100,

    colors: SwarmPlotDefaultProps.colors,
    colorBy: 'group',
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [
            ['darker', 0.6],
            ['opacity', 0.5],
        ],
    },
    margin: {
        top: 80,
        right: 100,
        bottom: 80,
        left: 100,
    },
    enableGridX: true,
    enableGridY: true,
    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'group if vertical, price if horizontal',
        legendPosition: 'middle',
        legendOffset: -46,
    },
    axisRight: {
        enable: true,
        orient: 'right',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'price if vertical, group if horizontal',
        legendPosition: 'middle',
        legendOffset: 76,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'group if vertical, price if horizontal',
        legendPosition: 'middle',
        legendOffset: 46,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'price if vertical, group if horizontal',
        legendPosition: 'middle',
        legendOffset: -76,
    },

    isInteractive: true,
    useMesh: false,
    debugMesh: false,

    animate: true,
    motionStiffness: 50,
    motionDamping: 10,
})

const ScatterPlot = () => {
    return (
        <ComponentTemplate
            name="SwarmPlot"
            meta={meta.SwarmPlot}
            icon="swarmplot"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={SwarmPlotDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                groups: data.groups,
                ...properties,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
            getDataSize={data => data.data.length}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveSwarmPlot
                        data={data.data}
                        groups={data.groups}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] id: ${node.id}, group: ${node.group}, value: ${node.value}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ScatterPlot
