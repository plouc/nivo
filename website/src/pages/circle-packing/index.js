import React from 'react'
import { patternLinesDef } from '@nivo/core'
import { ResponsiveCirclePacking, defaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
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
    valueFormat: { format: '', enabled: false },
    colors: { scheme: 'nivo' },
    colorBy: 'depth',
    inheritColorFromParent: false,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.4]],
    },
    padding: 4,
    leavesOnly: false,
    enableLabels: true,
    label: 'id',
    labelsFilter: label => label.node.depth === 2,
    labelsSkipRadius: 10,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },
    borderWidth: 1,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.5]],
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
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveCirclePacking
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
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
