import React from 'react'
import { ResponsiveCirclePackingHtml, defaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/circle-packing/meta.yml'
import mapper from '../../data/components/circle-packing/mapper'
import { groups } from '../../data/components/circle-packing/props'

const generateData = () => generateLibTree()

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
    colors: { scheme: 'spectral' },
    colorBy: 'depth',
    //childColor: {
    //    from: 'color',
    //    modifiers: [['darker', 0.3]],
    //},
    childColor: 'noinherit',
    padding: 2,
    leavesOnly: false,
    enableLabels: true,
    label: 'id',
    labelsFilter: label => label.node.depth === 2,
    labelsSkipRadius: 10,
    labelsTextColor: '#000000',
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    animate: true,
    motionConfig: 'gentle',
    isInteractive: true,
    isZoomable: true,
}

const CirclePackingHtml = () => {
    return (
        <ComponentTemplate
            name="CirclePackingHtml"
            meta={meta.CirclePackingHtml}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveCirclePackingHtml
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

export default CirclePackingHtml
