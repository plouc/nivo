/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import APIClient from '../../api-client/APIClient'
import HeatMapControls from './HeatMapControls'
import { generateLightDataSet } from './generators'
import propsMapper from './propsMapper'

export default class HeatMapAPI extends Component {
    state = {
        ...generateLightDataSet(),
    }

    render() {
        const { data, keys } = this.state

        return (
            <APIClient
                componentName="HeatMap"
                apiPath="/charts/heatmap"
                dataProperty="data"
                controls={HeatMapControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 800,
                    height: 600,
                    data: JSON.stringify(data, null, '  '),
                    keys,
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

                    // axes
                    // axes
                    'enable axisTop': true,
                    axisTop: {
                        orient: 'top',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -55,
                        legend: '',
                        legendOffset: 36,
                    },
                    'enable axisRight': false,
                    axisRight: {
                        orient: 'right',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'center',
                        legendOffset: 0,
                    },
                    'enable axisBottom': false,
                    axisBottom: {
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'center',
                        legendOffset: 36,
                    },
                    'enable axisLeft': true,
                    axisLeft: {
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'center',
                        legendOffset: -40,
                    },

                    enableGridX: false,
                    enableGridY: true,

                    // cells
                    cellShape: 'circle',
                    cellOpacity: 1,
                    cellBorderWidth: 0,
                    cellBorderColor: {
                        type: 'inherit:darker',
                        gamma: 0.4,
                    },

                    // labels
                    enableLabels: true,
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 1.4,
                    },
                }}
            />
        )
    }
}
