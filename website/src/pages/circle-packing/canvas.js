import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import { ResponsiveCirclePackingCanvas, defaultProps } from '@nivo/circle-packing'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/circle-packing/meta.yml'
import mapper from '../../data/components/circle-packing/mapper'
import { groups } from '../../data/components/circle-packing/props'

const NODE_COUNT = 1200

const generateData = () => {
    return {
        name: 'root',
        children: range(NODE_COUNT).map(i => ({
            name: `node.${i}`,
            value: random(1, 100),
        })),
    }
}

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    id: 'name',
    value: 'value',
    colors: { scheme: 'spectral' },
    childColor: 'noinherit',
    padding: 1,
    leavesOnly: true,
    enableLabel: false,
    label: 'name',
    labelSkipRadius: 10,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    isInteractive: true,
    isZoomable: true,
}

const CirclePackingCanvas = () => {
    return (
        <ComponentTemplate
            name="CirclePackingCanvas"
            meta={meta.CirclePackingCanvas}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={() => NODE_COUNT}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveCirclePackingCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={({ children, parent, ...node }) => {
                            logAction({
                                type: 'click',
                                label: `${node.id}: ${node.value}`,
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

export default CirclePackingCanvas
