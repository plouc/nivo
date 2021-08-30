import React from 'react'
import { ResponsiveNetworkCanvas, NetworkCanvasDefaultProps } from '@nivo/network'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/network/meta.yml'
import { groups } from '../../data/components/network/props'
import { generateNetworkData } from '@nivo/generators'

const initialProperties = Object.freeze({
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    linkDistance: 'distance',
    repulsivity: 4,
    iterations: 60,

    nodeColor: node => node.color,
    nodeBorderWidth: 1,
    nodeBorderColor: { theme: 'background' },

    linkColor: NetworkCanvasDefaultProps.linkColor,
    linkThickness: 1,

    isInteractive: true,
})

const generateData = () => generateNetworkData()

const NetworkCanvas = () => {
    return (
        <ComponentTemplate
            name="NetworkCanvas"
            meta={meta.NetworkCanvas}
            icon="network"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={NetworkCanvasDefaultProps}
            generateData={() =>
                generateData({
                    rootNodeRadius: 10,
                    maxMidNodes: 32,
                    midNodeRadius: 6,
                    leafRadius: 3,
                })
            }
            getDataSize={data => data.nodes.length}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveNetworkCanvas
                        nodes={data.nodes}
                        links={data.links}
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
