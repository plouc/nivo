import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveNetworkCanvas, canvasDefaultProps as defaults } from '@nivo/network'
import { generateNetworkData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/network/meta.yml'
import mapper, { dynamicLinkThicknessValue } from '../../data/components/network/mapper'
import { groups } from '../../data/components/network/props'

const initialProperties = Object.freeze({
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    linkDistance: (link: any) => link.distance,
    centeringStrength: 0.3,
    repulsivity: 6,
    iterations: defaults.iterations,

    nodeSize: defaults.nodeSize,
    activeNodeSize: defaults.activeNodeSize,
    inactiveNodeSize: defaults.inactiveNodeSize,
    nodeColor: (node: any) => node.color,
    nodeBorderWidth: 1,
    nodeBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    linkThickness: dynamicLinkThicknessValue,
    linkColor: defaults.linkColor,

    annotations: defaults.annotations,

    isInteractive: true,
})

const generateData = () =>
    generateNetworkData({
        minMidNodes: 9,
        maxMidNodes: 15,
        minLeaves: 7,
        maxLeaves: 12,
    })

const NetworkCanvas = () => {
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
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveNetworkCanvas
                        data={data}
                        {...properties}
                        theme={theme}
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
