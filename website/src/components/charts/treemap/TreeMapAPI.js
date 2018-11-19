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
import TreeMapControls from './TreeMapControls'
import propsMapper from './propsMapper'
import { generateLightDataSet } from './generators'

export default class TreeMapAPI extends Component {
    state = {
        ...generateLightDataSet(),
    }

    render() {
        const { root } = this.state

        return (
            <APIClient
                componentName="TreeMap"
                apiPath="/charts/treemap"
                dataProperty="root"
                controls={TreeMapControls}
                propsMapper={propsMapper}
                defaultProps={{
                    root: JSON.stringify(root, null, '  '),
                    tile: 'squarify',
                    leavesOnly: false,

                    // dimensions
                    width: 600,
                    height: 450,
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },

                    // labels
                    enableLabels: true,
                    labelSkipSize: 0,
                    label: 'loc',
                    labelFormat: '.0s',
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 0.6,
                    },
                    orientLabels: true,

                    innerPadding: 3,
                    outerPadding: 3,

                    colors: 'nivo',
                    colorBy: 'depth',

                    borderWidth: 1,
                    borderColor: {
                        type: 'inherit:darker',
                        gamma: 0.3,
                    },
                    identity: 'name',
                    value: 'loc',
                }}
            />
        )
    }
}
