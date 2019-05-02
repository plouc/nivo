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
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/line/props'
import mapper from '../../data/components/line/mapper'
import defaultSettings from '../../data/components/line/defaults'
import { generateLightDataSet } from '../../data/components/line/generator'
import meta from '../../data/components/line/meta.yml'

const data = generateLightDataSet()

const LineApi = () => {
    return (
        <>
            <SEO title="Line HTTP API" keywords={[...meta.Line.tags, 'HTTP API']} />
            <ApiClient
                componentName="Line"
                apiPath="/charts/line"
                flavors={meta.flavors}
                chartClass="line"
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    ...omit(defaultSettings, [
                        'isInteractive',
                        'enableSlices',
                        'debugSlices',
                        'enableCrosshair',
                        'crosshairType',
                    ]),
                    data: JSON.stringify(data, null, '  '),
                }}
            />
        </>
    )
}

export default LineApi
