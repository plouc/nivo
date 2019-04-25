/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
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
                dataProperty="root"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    root: JSON.stringify(data.root, null, '  '),
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
                }}
            />
        </>
    )
}

export default TreeMapApi
