/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveTreeMap, TreeMapDefaultProps } from '@nivo/treemap'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/treemap/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

const initialProperties = {
    identity: 'name',
    value: 'loc',
    valueFormat: { format: '.02s', enabled: true },
    tile: TreeMapDefaultProps.tile,
    leavesOnly: TreeMapDefaultProps.leavesOnly,
    innerPadding: TreeMapDefaultProps.innerPadding,
    outerPadding: TreeMapDefaultProps.outerPadding,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: TreeMapDefaultProps.label,
    labelSkipSize: 12,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.2]],
    },
    orientLabel: TreeMapDefaultProps.orientLabel,
    enableParentLabel: TreeMapDefaultProps.enableParentLabel,
    parentLabel: TreeMapDefaultProps.parentLabel,
    parentLabelSize: TreeMapDefaultProps.parentLabelSize,
    parentLabelPosition: TreeMapDefaultProps.parentLabelPosition,
    parentLabelPadding: TreeMapDefaultProps.parentLabelPadding,
    parentLabelTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },

    colors: TreeMapDefaultProps.colors,
    colorBy: TreeMapDefaultProps.colorBy,
    nodeOpacity: TreeMapDefaultProps.nodeOpacity,
    borderWidth: TreeMapDefaultProps.borderWidth,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.1]],
    },

    animate: TreeMapDefaultProps.animate,
    motionConfig: TreeMapDefaultProps.motionConfig,

    isInteractive: TreeMapDefaultProps.isInteractive,
}

const TreeMap = () => {
    return (
        <ComponentTemplate
            name="TreeMap"
            meta={meta.TreeMap}
            icon="treemap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={TreeMapDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTreeMap
                        data={data.root}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.pathComponents.join(' / ')}: ${
                                    node.formattedValue
                                }`,
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

export default TreeMap
