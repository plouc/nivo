/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import APIClient from '../../api-client/APIClient'
import PieControls from './PieControls'
import propsMapper from './propsMapper'

const DATASET_SIZE = 12
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

export default class PieAPI extends Component {
    state = {
        data: generateData(),
    }

    render() {
        const { data } = this.state

        return (
            <APIClient
                componentName="Pie"
                apiPath="/charts/pie"
                dataProperty="data"
                controls={PieControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 800,
                    height: 800,

                    margin: {
                        top: 40,
                        right: 80,
                        bottom: 80,
                        left: 80,
                    },

                    innerRadius: 0.5,
                    padAngle: 0.7,
                    cornerRadius: 3,

                    // Styling
                    colors: 'nivo',
                    colorBy: 'id',

                    // border
                    borderWidth: 0,
                    borderColor: { type: 'inherit:darker', gamma: 0.6 },

                    // radial labels
                    enableRadialLabels: true,
                    radialLabel: 'id',
                    radialLabelsSkipAngle: 10,
                    radialLabelsTextXOffset: 6,
                    radialLabelsTextColor: { type: 'custom', color: '#333333' },
                    radialLabelsLinkOffset: 0,
                    radialLabelsLinkDiagonalLength: 16,
                    radialLabelsLinkHorizontalLength: 24,
                    radialLabelsLinkStrokeWidth: 1,
                    radialLabelsLinkColor: { type: 'inherit' },

                    // slice labels
                    enableSlicesLabels: true,
                    sliceLabel: 'value',
                    slicesLabelsSkipAngle: 10,
                    slicesLabelsTextColor: { type: 'custom', color: '#333333' },

                    data: JSON.stringify(data, null, '  '),
                }}
            />
        )
    }
}
