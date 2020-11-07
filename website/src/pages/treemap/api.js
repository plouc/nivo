/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { TreeMapDefaultProps } from '@nivo/treemap'
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/treemap/props'
import mapper from '../../data/components/treemap/mapper'
import { generateLightDataSet } from '../../data/components/treemap/generator'
import meta from '../../data/components/treemap/meta.yml'

const data = generateLightDataSet()

const TreeMapApi = () => {
    return (
        <>
            <SEO title="TreeMap HTTP API" keywords={[...meta.TreeMap.tags, 'HTTP API']} />
            <ApiClient
                componentName="TreeMap"
                chartClass="treemap"
                apiPath="/charts/treemap"
                flavors={meta.flavors}
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    root: JSON.stringify(data.root, null, '  '),
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

                    enableLabel: TreeMapDefaultProps.enableLabel,
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

                    colors: { scheme: 'nivo' },
                    colorBy: 'path.1',
                    nodeOpacity: 0.5,
                    borderWidth: 0,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    },
                }}
            />
        </>
    )
}

export default TreeMapApi
