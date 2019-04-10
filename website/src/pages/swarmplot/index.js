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
import { groupsByScope } from '../../data/components/swarmplot/props'
import { generateLightDataSet } from '../../data/components/swarmplot/generator'

const initialProperties = {
    layout: 'horizontal',
    forceStrength: 4,
    simulationIterations: 160,
    gap: SwarmPlotDefaultProps.gap,
    colors: SwarmPlotDefaultProps.colors,
    nodeSize: 14,
    nodePadding: 4,
    borderWidth: 1,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },
    scale: {
        type: 'linear',
        min: 0,
        max: 500,
    },
    margin: {
        top: 80,
        right: 80,
        bottom: 80,
        left: 80,
    },
    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 46,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -60,
    },
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
    isInteractive: true,
    animate: true,
    motionStiffness: 150,
    motionDamping: 18,
}

const ScatterPlot = () => {
    return (
        <ComponentTemplate
            name="SwarmPlot"
            meta={meta.SwarmPlot}
            icon="swarmplot"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groupsByScope.SwarmPlot}
            initialProperties={initialProperties}
            defaultProperties={SwarmPlotDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveSwarmPlot
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[point] serie: ${node.serie.id}, x: ${node.x}, y: ${
                                    node.y
                                }`,
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
