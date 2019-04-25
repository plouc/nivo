/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateSankeyData } from '@nivo/generators'
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/sankey/props'
import mapper from '../../data/components/sankey/mapper'
import meta from '../../data/components/sankey/meta.yml'

const data = generateSankeyData({ nodeCount: 6, maxIterations: 8 })

const SankeyApi = () => {
    return (
        <>
            <SEO title="Sankey HTTP API" keywords={[...meta.Sankey.tags, 'HTTP API']} />
            <ApiClient
                componentName="Sankey"
                chartClass="sankey"
                apiPath="/charts/sankey"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 1200,
                    height: 800,
                    data: JSON.stringify(data, null, '  '),
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
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
                }}
            />
        </>
    )
}

export default SankeyApi
