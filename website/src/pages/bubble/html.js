/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveBubbleHtml, BubbleHtmlDefaultProps } from '@nivo/circle-packing'
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
    colors: { scheme: 'paired' },
    colorBy: 'depth',
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
    motionStiffness: 90,
    motionDamping: 12,

    isInteractive: true,

    isZoomable: true,
}

const BubbleHtml = () => {
    return (
        <ComponentTemplate
            name="BubbleHtml"
            meta={meta.BubbleHtml}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={BubbleHtmlDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLibTree}
            dataKey="root"
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBubbleHtml
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

export default BubbleHtml
