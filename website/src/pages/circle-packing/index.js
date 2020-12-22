import React from 'react'
import { patternLinesDef } from '@nivo/core'
import { ResponsiveCirclePacking, BubbleDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/circle-packing/meta.yml'
import mapper from '../../data/components/circle-packing/mapper'
import { groups } from '../../data/components/circle-packing/props'

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    id: 'name',
    value: 'loc',
    colors: { scheme: 'spectral' },
    childColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    padding: 6,
    leavesOnly: false,

    enableLabel: true,
    label: 'id',
    labelSkipRadius: 8,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    borderWidth: 2,
    borderColor: {
        from: 'color',
    },

    defs: [
        patternLinesDef('lines', {
            background: 'none',
            color: 'inherit',
            rotation: -45,
            lineWidth: 5,
            spacing: 8,
        }),
    ],
    fill: [{ match: { depth: 1 }, id: 'lines' }],

    animate: true,
    motionConfig: 'gentle',

    isInteractive: true,

    isZoomable: true,
}

const generateData = () => generateLibTree()

const CirclePacking = () => {
    return (
        <ComponentTemplate
            name="CirclePacking"
            meta={meta.CirclePacking}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={BubbleDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveCirclePacking
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

export default CirclePacking
