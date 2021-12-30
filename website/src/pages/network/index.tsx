import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveNetwork, svgDefaultProps as defaults } from '@nivo/network'
import { generateNetworkData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/network/meta.yml'
import mapper, {
    dynamicNodeSizeValue,
    dynamicLinkThicknessValue,
} from '../../data/components/network/mapper'
import { groups } from '../../data/components/network/props'

const initialProperties = Object.freeze({
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    linkDistance: 30,
    repulsivity: 6,
    iterations: 60,

    nodeSize: dynamicNodeSizeValue,
    nodeColor: (node: any) => node.color,
    nodeBlendMode: 'normal',
    nodeBorderWidth: 1,
    nodeBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    linkThickness: dynamicLinkThicknessValue,
    linkColor: defaults.linkColor,
    linkBlendMode: 'multiply',

    annotations: defaults.annotations,

    isInteractive: true,

    animate: true,
    motionConfig: 'wobbly',
})

const generateData = () => generateNetworkData()

const Network = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/network.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Network"
            meta={meta.Network}
            icon="network"
            flavors={meta.flavors}
            currentFlavor="svg"
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
                    <ResponsiveNetwork
                        data={
                            data /*{
                            nodes: [
                                { id: 'A' },
                                { id: 'B' },
                                { id: 'C' },
                                { id: 'D' },
                                { id: 'E' },
                            ],
                            links: [
                                { source: 'A', target: 'B' },
                                { source: 'B', target: 'C' },
                                { source: 'C', target: 'D' },
                                { source: 'D', target: 'E' },
                            ],
                        }*/
                        }
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

export default Network
