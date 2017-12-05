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
import SunburstControls from './SunburstControls'
import propsMapper from './propsMapper'

export default class SunburstAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Sunburst"
                apiPath="/charts/sunburst"
                dataProperty="data"
                controls={SunburstControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    data: JSON.stringify(this.props.data, null, '  '),

                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },

                    identity: 'name',
                    value: 'loc',

                    cornerRadius: 2,

                    // border
                    borderWidth: 1,
                    borderColor: 'white',

                    // theming
                    colors: 'nivo',
                    colorBy: 'id',
                    childColor: {
                        type: 'inherit',
                    },
                }}
            />
        )
    }
}
