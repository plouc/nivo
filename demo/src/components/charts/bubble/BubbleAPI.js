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
import BubbleControls from './BubbleControls'
import propsMapper from './propsMapper'

class BubbleAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Bubble"
                apiPath="/charts/bubble"
                dataProperty="root"
                controls={BubbleControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    root: JSON.stringify(this.props.root, null, '  '),
                    identity: 'name',
                    value: 'loc',
                    colors: 'nivo',
                    colorBy: 'depth',
                    padding: 1,
                    enableLabel: true,
                    leavesOnly: false,
                    label: 'id',
                    labelSkipRadius: 8,
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 0.8,
                    },
                    labelTextDY: 4,
                    borderWidth: 0,
                    borderColor: {
                        type: 'inherit:darker',
                        gamma: 0.3,
                    },
                }}
            />
        )
    }
}

export default BubbleAPI
