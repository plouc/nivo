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
import ChordControls from './ChordControls'
import propsMapper from './propsMapper'
import { generateChordData } from '@nivo/generators'

const MATRIX_SIZE = 5

class ChordAPI extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
    }

    render() {
        const { matrix, keys } = this.state

        return (
            <APIClient
                componentName="Chord"
                apiPath="/charts/chord"
                dataProperty="matrix"
                controls={ChordControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 800,
                    height: 800,
                    matrix: JSON.stringify(matrix, null, '  '),
                    keys,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    padAngle: 0.02,
                    innerRadiusRatio: 0.96,
                    innerRadiusOffset: 0.01,

                    arcOpacity: 1,
                    arcBorderWidth: 1,
                    arcBorderColor: {
                        type: 'inherit:darker',
                        gamma: 0.4,
                    },

                    ribbonOpacity: 0.5,
                    ribbonBorderWidth: 1,
                    ribbonBorderColor: {
                        type: 'inherit:darker',
                        gamma: 0.4,
                    },

                    colors: 'nivo',
                    colorBy: 'depth',

                    // labels
                    enableLabel: true,
                    label: 'id',
                    labelOffset: 12,
                    labelRotation: -90,
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 1,
                    },
                }}
            />
        )
    }
}

export default ChordAPI
