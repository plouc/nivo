import React from 'react'
import omit from 'lodash/omit'
import { generateSankeyData } from '@nivo/generators'
import {
    ResponsiveSankey,
    svgDefaultProps,
    SankeySvgProps,
    DefaultNode,
    DefaultLink,
} from '@nivo/sankey'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sankey/meta.yml'
import mapper from '../../data/components/sankey/mapper'
import { groups } from '../../data/components/sankey/props'

type MappedSankeyProps = Omit<SankeySvgProps<DefaultNode, DefaultLink>, 'data' | 'width' | 'height'>
type UnmappedSankeyProps = Omit<MappedSankeyProps, 'valueFormat'> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
}

const initialProperties: UnmappedSankeyProps = {
    margin: {
        top: 40,
        right: 160,
        bottom: 40,
        left: 50,
    },

    valueFormat: { format: '', enabled: false },

    layout: 'horizontal' as const,
    align: 'justify' as const,
    sort: 'auto' as const,
    colors: { scheme: 'category10' as const },

    nodeOpacity: 1,
    nodeHoverOpacity: 1,
    nodeHoverOthersOpacity: 0.35,
    nodeThickness: 18,
    nodeInnerPadding: 0,
    nodeSpacing: 24,
    nodeBorderWidth: 0,
    nodeBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },
    nodeBorderRadius: 3,

    linkOpacity: 0.5,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.1,
    linkContract: 3,
    linkBlendMode: 'multiply' as const,
    enableLinkGradient: true,

    enableLabels: true,
    labelPosition: 'outside' as const,
    labelOrientation: 'vertical' as const,
    labelPadding: 16,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,

    isInteractive: svgDefaultProps.isInteractive,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: 'right-to-left',
            itemsSpacing: 2,
            itemTextColor: '#999',
            symbolSize: 14,
            onClick: (d: any) => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const generateData = () => generateSankeyData({ nodeCount: 6, maxIterations: 8 })

const Sankey = () => (
    <ComponentTemplate<
        UnmappedSankeyProps,
        MappedSankeyProps,
        SankeySvgProps<DefaultNode, DefaultLink>['data']
    >
        name="Sankey"
        meta={meta.Sankey}
        icon="sankey"
        flavors={meta.flavors}
        currentFlavor="svg"
        properties={groups}
        initialProperties={initialProperties}
        defaultProperties={svgDefaultProps}
        propertiesMapper={mapper}
        generateData={generateData}
    >
        {(properties, data, theme, logAction) => {
            return (
                <ResponsiveSankey
                    data={data}
                    {...properties}
                    theme={theme}
                    onClick={node => {
                        let label
                        if ('id' in node) {
                            label = `[node] ${node.id}: ${node.value}`
                        } else {
                            label = `[link] ${node.source.id} > ${node.target.id}: ${node.value}`
                        }

                        logAction({
                            type: 'click',
                            label,
                            data: omit(node, [
                                'sourceLinks',
                                'targetLinks',
                                'source.sourceLinks',
                                'source.targetLinks',
                                'target.sourceLinks',
                                'target.targetLinks',
                            ]),
                        })
                    }}
                />
            )
        }}
    </ComponentTemplate>
)

export default Sankey
