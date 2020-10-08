import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ComputedNode, ResponsiveNetwork, svgDefaultProps as defaults } from '@bitbloom/nivo-network'
import { generateNetworkData } from '@bitbloom/nivo-generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/network/meta.yml'
import mapper, {
    dynamicNodeSizeValue,
    dynamicActiveNodeSizeValue,
    dynamicLinkThicknessValue,
} from '../../data/components/network/mapper'
import { groups } from '../../data/components/network/props'

type Node = ReturnType<typeof generateData>['nodes'][number]
type Link = ReturnType<typeof generateData>['links'][number]

const initialProperties = Object.freeze({
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    linkDistance: (link: Link) => link.distance,
    centeringStrength: 0.3,
    repulsivity: 6,
    iterations: defaults.iterations,

    nodeSize: dynamicNodeSizeValue,
    activeNodeSize: dynamicActiveNodeSizeValue,
    inactiveNodeSize: defaults.inactiveNodeSize,
    nodeColor: (node: any) => node.color,
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
                    <ResponsiveNetwork<Node, Link>
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={(node: ComputedNode<any>) => {
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
