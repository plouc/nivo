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
import { groups } from '../../data/components/heatmap/props'
import mapper from '../../data/components/heatmap/mapper'
import { generateLightDataSet } from '../../data/components/heatmap/generator'
import meta from '../../data/components/heatmap/meta.yml'

const data = generateLightDataSet()

const HeatMapApi = () => {
    return (
        <>
            <SEO title="HeatMap HTTP API" keywords={[...meta.HeatMap.tags, 'HTTP API']} />
            <ApiClient
                componentName="HeatMap"
                chartClass="heatmap"
                apiPath="/charts/heatmap"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 800,
                    height: 600,
                    data: JSON.stringify(data.data, null, '  '),
                    keys: data.keys,
                    indexBy: 'country',

                    margin: {
                        top: 100,
                        right: 60,
                        bottom: 30,
                        left: 60,
                    },

                    minValue: 'auto',
                    maxValue: 'auto',
                    forceSquare: true,
                    sizeVariation: 0.4,
                    padding: 2,
                    colors: 'nivo',

                    axisTop: {
                        enable: true,
                        orient: 'top',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -55,
                        legend: '',
                        legendOffset: 36,
                    },
                    axisRight: {
                        enable: false,
                        orient: 'right',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 0,
                    },
                    axisBottom: {
                        enable: false,
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 36,
                    },
                    axisLeft: {
                        enable: true,
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    },

                    enableGridX: false,
                    enableGridY: true,

                    cellShape: 'circle',
                    cellOpacity: 1,
                    cellBorderWidth: 0,
                    cellBorderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.4]],
                    },

                    enableLabels: true,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.4]],
                    },
                }}
            />
        </>
    )
}

export default HeatMapApi
