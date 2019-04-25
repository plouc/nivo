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
import { groups } from '../../data/components/bar/props'
import meta from '../../data/components/bar/meta.yml'
import mapper from '../../data/components/bar/mapper'
import { generateLightDataSet } from '../../data/components/bar/generator'

const { data, keys } = generateLightDataSet()

const BarApi = () => {
    return (
        <>
            <SEO title="Bar HTTP API" keywords={[...meta.Bar.tags, 'HTTP API']} />
            <ApiClient
                componentName="Bar"
                chartClass="bar"
                apiPath="/charts/bar"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 1200,
                    height: 500,
                    margin: {
                        top: 40,
                        right: 50,
                        bottom: 40,
                        left: 50,
                    },
                    data: JSON.stringify(data, null, '  '),
                    keys: keys,
                    indexBy: 'country',

                    colors: { scheme: 'nivo' },
                    colorBy: 'id',
                    borderRadius: 0,
                    borderWidth: 0,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                    },

                    padding: 0.2,
                    innerPadding: 0,
                    minValue: 'auto',
                    maxValue: 'auto',

                    groupMode: 'stacked',
                    layout: 'vertical',
                    reverse: false,

                    axisTop: {
                        enable: false,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 36,
                    },
                    axisRight: {
                        enable: false,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 0,
                    },
                    axisBottom: {
                        enable: true,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 36,
                    },
                    axisLeft: {
                        enable: true,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'food',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    },

                    enableGridX: false,
                    enableGridY: true,

                    enableLabel: true,
                    labelSkipWidth: 12,
                    labelSkipHeight: 12,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                    },
                }}
            />
        </>
    )
}

export default BarApi
