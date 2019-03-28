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
import { ResponsiveTreeMapCanvas, TreeMapCanvasDefaultProps } from '@nivo/treemap'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groupsByScope } from '../../data/components/treemap/props'
import { generateHeavyDataSet } from '../../data/components/treemap/generator'

const initialProperties = {
    tile: 'squarify',
    leavesOnly: true,
    innerPadding: 2,
    outerPadding: 0,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    enableLabel: true,
    labelFormat: '.0s',
    labelSkipSize: 18,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.6,
    },
    orientLabel: true,

    colors: 'paired',
    colorBy: 'id',
    borderWidth: 1,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    isInteractive: true,
}

const TreeMapCanvas = () => {
    return (
        <ComponentTemplate
            name="TreeMapCanvas"
            meta={meta.TreeMapCanvas}
            icon="treemap"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groupsByScope.TreeMapCanvas}
            initialProperties={initialProperties}
            defaultProperties={TreeMapCanvasDefaultProps}
            propertiesMapper={mapper}
            generateData={generateHeavyDataSet}
            dataKey="root"
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTreeMapCanvas
                        root={data.root}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[cell] ${node.id}: ${node.value}`,
                                data: omit(node, ['parent', 'children']),
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default TreeMapCanvas
