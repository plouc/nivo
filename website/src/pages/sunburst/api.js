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
import { groups } from '../../data/components/sunburst/props'
import mapper from '../../data/components/sunburst/mapper'
import meta from '../../data/components/sunburst/meta.yml'

const data = generateLibTree()

const SunburstApi = () => {
    return (
        <>
            <SEO title="Sunburst HTTP API" keywords={[...meta.Sunburst.tags, 'HTTP API']} />
            <ApiClient
                componentName="Sunburst"
                chartClass="sunburst"
                apiPath="/charts/sunburst"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    data: JSON.stringify(data, null, '  '),

                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },

                    identity: 'name',
                    value: 'loc',

                    cornerRadius: 2,

                    borderWidth: 1,
                    borderColor: 'white',

                    colors: { scheme: 'nivo' },
                    childColor: {
                        from: 'color',
                    },
                }}
            />
        </>
    )
}

export default SunburstApi
