/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateLibTree } from '@nivo/generators'
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/bubble/props'
import mapper from '../../data/components/bubble/mapper'
import meta from '../../data/components/bubble/meta.yml'

const root = generateLibTree()

const BubbleApi = () => {
    return (
        <>
            <SEO title="Bubble HTTP API" keywords={[...meta.Bubble.tags, 'HTTP API']} />
            <ApiClient
                componentName="Bubble"
                chartClass="circle-packing"
                apiPath="/charts/bubble"
                flavors={meta.flavors}
                dataProperty="root"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    root: JSON.stringify(root, null, '  '),
                    identity: 'name',
                    value: 'loc',
                    colors: { scheme: 'nivo' },
                    colorBy: 'depth',
                    padding: 1,
                    enableLabel: true,
                    leavesOnly: false,
                    label: 'id',
                    labelSkipRadius: 8,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 0.8]],
                    },
                    labelTextDY: 4,
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

export default BubbleApi
