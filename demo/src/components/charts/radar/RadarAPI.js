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
import RadarControls from './RadarControls'
import propsMapper from './propsMapper'

export default class RadarAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Radar"
                apiPath="/charts/radar"
                dataProperty="data"
                controls={RadarControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    data: JSON.stringify(this.props.data, null, '  '),
                    keys: this.props.keys,
                    indexBy: 'taste',

                    margin: {
                        top: 70,
                        right: 80,
                        bottom: 40,
                        left: 80,
                    },

                    curve: 'catmullRomClosed',

                    // border
                    borderWidth: 2,
                    borderColor: { type: 'inherit' },

                    // axes & grid
                    gridLevels: 5,
                    gridShape: 'circular',
                    gridLabelOffset: 36,

                    // dots
                    enableDots: true,
                    dotSize: 8,
                    dotColor: { type: 'inherit' },
                    dotBorderWidth: 0,
                    dotBorderColor: { type: 'custom', color: '#fff' },
                    enableDotLabel: true,
                    dotLabel: 'value',
                    dotLabelYOffset: -12,

                    // theming
                    colors: 'nivo',
                    colorBy: 'key',
                    fillOpacity: 0.1,
                }}
            />
        )
    }
}
