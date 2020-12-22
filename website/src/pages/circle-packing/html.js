import React from 'react'
import { ResponsiveCirclePackingHtml, BubbleHtmlDefaultProps } from '@nivo/circle-packing'
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
    colors: { scheme: 'spectral' },
    childColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    padding: 1,
    leavesOnly: false,

    enableLabel: true,
    label: 'id',
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
            defaultProperties={BubbleHtmlDefaultProps}
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
