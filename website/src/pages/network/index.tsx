import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ComputedNode, ResponsiveNetwork, svgDefaultProps } from '@nivo/network'
import { generateNetworkData } from '@nivo/generators'
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

const initialProperties = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    linkDistance: (link: Link) => link.distance,
    centeringStrength: svgDefaultProps.centeringStrength,
    repulsivity: svgDefaultProps.repulsivity,
    iterations: svgDefaultProps.iterations,
    nodeSize: dynamicNodeSizeValue,
    activeNodeSize: dynamicActiveNodeSizeValue,
    inactiveNodeSize: svgDefaultProps.inactiveNodeSize,
    nodeColor: (node: any) => node.color,
    nodeBorderWidth: svgDefaultProps.nodeBorderWidth,
    nodeBorderColor: svgDefaultProps.nodeBorderColor,
    linkThickness: dynamicLinkThicknessValue,
    linkColor: svgDefaultProps.linkColor,
    linkBlendMode: 'multiply',
    annotations: svgDefaultProps.annotations,
    isInteractive: svgDefaultProps.isInteractive,
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
}

const generateData = () => generateNetworkData()

const Network = ({ location }: PageProps) => {
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
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={data => data.nodes.length}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveNetwork<Node, Link>
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
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
