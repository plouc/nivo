import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
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
    xFormat: { format: '>-.2f', enabled: false },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yFormat: { format: '>-.2f', enabled: false },
    colors: svgDefaultProps.colors,
    blendMode: svgDefaultProps.blendMode,
    nodeSize: svgDefaultProps.nodeSize,
    enableGridX: svgDefaultProps.enableGridX,
    enableGridY: svgDefaultProps.enableGridY,
    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
        truncateTickAt: 0,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 46,
        format: d => `${d} kg`,
        truncateTickAt: 0,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
        legendPosition: 'middle',
        legendOffset: -60,
        format: d => `${d} cm`,
        truncateTickAt: 0,
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
            itemHeight: 16,
            itemsSpacing: 3,
            itemDirection: 'left-to-right',
            symbolSize: 16,
            symbolShape: 'circle',
        },
    ],
}

const ScatterPlot = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/scatterplot.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

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
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => (
                <ResponsiveScatterPlot
                    {...properties}
                    data={data}
                    theme={theme}
                    ref={chartRef as Ref<SVGSVGElement>}
                    debounceResize={200}
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
