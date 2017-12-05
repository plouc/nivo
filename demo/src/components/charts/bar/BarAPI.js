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
import BarControls from './BarControls'
import { generateLightDataSet } from './generators'
import propsMapper from './propsMapper'

export default class BarAPI extends Component {
    state = {
        ...generateLightDataSet(),
    }

    render() {
        const { data, keys } = this.state

        return (
            <APIClient
                componentName="Bar"
                apiPath="/charts/bar"
                dataProperty="data"
                controls={BarControls}
                propsMapper={propsMapper}
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

                    colors: 'nivo',
                    colorBy: 'id',
                    borderRadius: 0,
                    borderWidth: 0,
                    borderColor: {
                        type: 'inherit:darker',
                        gamma: 1.6,
                    },

                    padding: 0.2,
                    innerPadding: 0,
                    minValue: 'auto',
                    maxValue: 'auto',

                    groupMode: 'stacked',
                    layout: 'vertical',
                    reverse: false,

                    // axes
                    'enable axisTop': false,
                    axisTop: {
                        orient: 'top',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 36,
                    },
                    'enable axisRight': false,
                    axisRight: {
                        orient: 'right',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 0,
                    },
                    'enable axisBottom': true,
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
                        legend: 'food',
                        legendPosition: 'center',
                        legendOffset: -40,
                    },

                    // grid
                    enableGridX: false,
                    enableGridY: true,

                    // labels
                    enableLabel: true,
                    labelSkipWidth: 12,
                    labelSkipHeight: 12,
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 1.6,
                    },
                }}
            />
        )
    }
}
