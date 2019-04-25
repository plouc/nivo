/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { patternLinesDef } from '@nivo/core'
import { ResponsiveBubble, BubbleDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bubble/meta.yml'
import mapper from '../../data/components/bubble/mapper'
import { groups } from '../../data/components/bubble/props'

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    identity: 'name',
    value: 'loc',
    colors: { scheme: 'nivo' },
    colorBy: 'depth',
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
    motionStiffness: 90,
    motionDamping: 12,

    isInteractive: true,

    isZoomable: true,
}

const Bubble = () => {
    return (
        <ComponentTemplate
            name="Bubble"
            meta={meta.Bubble}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={BubbleDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLibTree}
            dataKey="root"
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBubble
                        root={data}
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

export default Bubble
