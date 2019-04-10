/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import { ResponsiveBubbleCanvas, BubbleCanvasDefaultProps } from '@nivo/circle-packing'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bubble/meta.yml'
import mapper from '../../data/components/bubble/mapper'
import { groupsByScope } from '../../data/components/bubble/props'

const NODE_COUNT = 2000

const generateData = () => {
    return {
        id: 'root',
        children: range(NODE_COUNT).map(i => ({
            id: `node.${i}`,
            value: random(10, 100000),
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

    identity: 'id',
    value: 'value',

    colors: { scheme: 'set3' },
    padding: 1,
    leavesOnly: true,

    enableLabel: false,
    label: 'name',
    labelSkipRadius: 10,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 12,

    isInteractive: true,

    isZoomable: true,
}

const BubbleCanvas = () => {
    return (
        <ComponentTemplate
            name="BubbleCanvas"
            meta={meta.BubbleCanvas}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groupsByScope.BubbleCanvas}
            initialProperties={initialProperties}
            defaultProperties={BubbleCanvasDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            dataKey="root"
            getDataSize={() => NODE_COUNT}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBubbleCanvas
                        root={data}
                        {...properties}
                        theme={theme}
                        onClick={({ children, parent, ...node }) => {
                            logAction({
                                type: 'click',
                                label: `${node.id}: ${node.value}`,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default BubbleCanvas
