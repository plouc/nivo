import React from 'react'
import { ResponsiveScatterPlot, svgDefaultProps } from '@nivo/scatterplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/scatterplot/meta.yml'
import mapper from '../../data/components/scatterplot/mapper'
import { groups } from '../../data/components/scatterplot/props'
import { generateLightDataSet } from '../../data/components/scatterplot/generator'

const initialProperties = {
    margin: {
        top: 60,
        right: 140,
        bottom: 70,
        left: 90,
    },

    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    xFormat: { format: '>-.2f', enabled: true },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yFormat: { format: '>-.2f', enabled: true },

    colors: svgDefaultProps.colors,
    blendMode: 'multiply',

    nodeSize: svgDefaultProps.nodeSize,

    enableGridX: svgDefaultProps.enableGridX,
    enableGridY: svgDefaultProps.enableGridY,
    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 46,
        format: d => `${d} kg`,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
        legendPosition: 'middle',
        legendOffset: -60,
        format: d => `${d} cm`,
    },

    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,

    isInteractive: svgDefaultProps.isInteractive,
    useMesh: svgDefaultProps.useMesh,
    debugMesh: svgDefaultProps.debugMesh,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
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
}

const ScatterPlot = () => {
    return (
        <ComponentTemplate
            name="ScatterPlot"
            meta={meta.ScatterPlot}
            icon="scatterplot"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
        >
            {(properties, data, theme, logAction) => (
                <ResponsiveScatterPlot
                    data={data}
                    {...properties}
                    theme={theme}
                    onClick={node => {
                        logAction({
                            type: 'click',
                            label: `[node] id: ${node.id}, x: ${node.x}, y: ${node.y}`,
                            color: node.color,
                            data: node,
                        })
                    }}
                />
            )}
        </ComponentTemplate>
    )
}

export default ScatterPlot
