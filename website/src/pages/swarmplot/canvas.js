import React from 'react'
import { ResponsiveSwarmPlotCanvas, defaultProps } from '@nivo/swarmplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/swarmplot/meta.yml'
import mapper from '../../data/components/swarmplot/mapper'
import { groups } from '../../data/components/swarmplot/props'
import { generateHeavyDataSet } from '../../data/components/swarmplot/generator'
import { graphql, useStaticQuery } from 'gatsby'

const initialProperties = Object.freeze({
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    groupBy: 'group',
    identity: 'id',
    value: 'price',
    valueFormat: { format: '$.2f', enabled: true },
    valueScale: {
        type: 'linear',
        min: 0,
        max: 500,
        reverse: false,
    },
    size: {
        key: 'volume',
        values: [4, 20],
        sizes: [4, 12],
    },
    spacing: 1,
    layout: defaultProps.layout,
    gap: defaultProps.gap,

    forceStrength: 1,
    simulationIterations: 60,

    colors: { scheme: 'paired' },
    colorBy: 'group',
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.6]],
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
    useMesh: true,
    debugMesh: false,
})

const SwarmPlotCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/swarmplot-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="SwarmPlotCanvas"
            meta={meta.SwarmPlotCanvas}
            icon="swarmplot"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                groups: data.groups,
                ...properties,
            })}
            generateData={generateHeavyDataSet}
            getTabData={data => data.data}
            getDataSize={data => data.data.length}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveSwarmPlotCanvas
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

export default SwarmPlotCanvas
