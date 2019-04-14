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
import { ResponsiveTreeMap, TreeMapDefaultProps } from '@nivo/treemap'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groupsByScope } from '../../data/components/treemap/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

const initialProperties = {
    identity: 'name',
    value: 'loc',
    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 3,
    outerPadding: 3,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: 'loc',
    labelFormat: '.0s',
    labelSkipSize: 12,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.2]],
    },
    orientLabel: true,

    colors: { scheme: 'nivo' },
    colorBy: 'depth',
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,
}

const TreeMap = () => {
    return (
        <ComponentTemplate
            name="TreeMap"
            meta={meta.TreeMap}
            icon="treemap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groupsByScope.TreeMap}
            initialProperties={initialProperties}
            defaultProperties={TreeMapDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
            dataKey="root"
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTreeMap
                        root={data.root}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.id}: ${node.value}`,
                                color: node.color,
                                data: omit(node, ['parent', 'children']),
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default TreeMap
