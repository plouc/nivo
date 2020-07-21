/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import omit from 'lodash/omit'
import { generateSankeyData } from '@nivo/generators'
import { ResponsiveSankey, SankeyDefaultProps } from '@nivo/sankey'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sankey/meta.yml'
import mapper from '../../data/components/sankey/mapper'
import { groups } from '../../data/components/sankey/props'

const initialProperties = {
    margin: {
        top: 40,
        right: 160,
        bottom: 40,
        left: 50,
    },

    layout: 'horizontal',
    align: 'justify',
    sort: 'auto',
    colors: { scheme: 'category10' },

    nodeOpacity: 1,
    nodeHoverOpacity: 1,
    nodeThickness: 18,
    nodeInnerPadding: 3,
    nodeSpacing: 24,
    nodeBorderWidth: 0,
    nodeBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    linkOpacity: 0.5,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.1,
    linkContract: 0,
    linkBlendMode: 'multiply',
    enableLinkGradient: true,

    enableLabels: true,
    labelPosition: 'outside',
    labelOrientation: 'vertical',
    labelPadding: 16,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    animate: SankeyDefaultProps.animate,
    motionConfig: SankeyDefaultProps.motionConfig,

    isInteractive: SankeyDefaultProps.isInteractive,

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
            onClick: d => {
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

const Sankey = () => {
    return (
        <ComponentTemplate
            name="Sankey"
            meta={meta.Sankey}
            icon="sankey"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={SankeyDefaultProps}
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
                            if (node.id) {
                                label = `[node] ${node.id}: ${node.value}`
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
}

export default Sankey
