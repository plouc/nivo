import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveSwarmPlotCanvas, defaultProps } from '@nivo/swarmplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/swarmplot/meta.yml'
import mapper from '../../data/components/swarmplot/mapper'
import { groups } from '../../data/components/swarmplot/props'
import { generateHeavyDataSet } from '../../data/components/swarmplot/generator'

const initialProperties = Object.freeze({
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    groupBy: 'group',
    id: 'id',
    value: 'price',
    valueFormat: { format: '$.2f', enabled: false },
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
    borderWidth: defaultProps.borderWidth,
    borderColor: defaultProps.borderColor,
    margin: {
        top: 80,
        right: 100,
        bottom: 80,
        left: 100,
    },
    enableGridX: defaultProps.enableGridX,
    enableGridY: defaultProps.enableGridY,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
    },
    axisRight: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 60,
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'group if vertical, price if horizontal',
        legendPosition: 'middle',
        legendOffset: 40,
        truncateTickAt: 0,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'price if vertical, group if horizontal',
        legendPosition: 'middle',
        legendOffset: -60,
        truncateTickAt: 0,
    },
    isInteractive: true,
    useMesh: true,
    debugMesh: false,
})

const SwarmPlotCanvas = ({ location }: PageProps) => {
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
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveSwarmPlotCanvas
                        {...properties}
                        data={data.data}
                        groups={data.groups}
                        theme={theme}
                        ref={chartRef as Ref<HTMLCanvasElement>}
                        debounceResize={200}
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
