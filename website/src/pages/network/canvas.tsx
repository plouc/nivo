import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveNetworkCanvas, canvasDefaultProps as defaults } from '@nivo/network'
import { generateNetworkData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/network/meta.yml'
import mapper, { dynamicLinkThicknessValue } from '../../data/components/network/mapper'
import { groups } from '../../data/components/network/props'

const initialProperties = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    linkDistance: (link: any) => link.distance,
    centeringStrength: defaults.centeringStrength,
    repulsivity: defaults.repulsivity,
    iterations: defaults.iterations,
    nodeSize: defaults.nodeSize,
    activeNodeSize: defaults.activeNodeSize,
    inactiveNodeSize: defaults.inactiveNodeSize,
    nodeColor: (node: any) => node.color,
    nodeBorderWidth: defaults.nodeBorderWidth,
    nodeBorderColor: defaults.nodeBorderColor,
    linkThickness: dynamicLinkThicknessValue,
    linkColor: defaults.linkColor,
    annotations: defaults.annotations,
    isInteractive: defaults.isInteractive,
}

const generateData = () =>
    generateNetworkData({
        minMidNodes: 9,
        maxMidNodes: 15,
        minLeaves: 7,
        maxLeaves: 12,
    })

const NetworkCanvas = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/network-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="NetworkCanvas"
            meta={meta.NetworkCanvas}
            icon="network"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={data => data.nodes.length}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveNetworkCanvas
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<HTMLCanvasElement>}
                        debounceResize={200}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] id: ${node.id}, index: ${node.index}`,
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

export default NetworkCanvas
