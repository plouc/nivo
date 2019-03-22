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
import SankeyControls from './SankeyControls'
import propsMapper from './propsMapper'

export default class SankeyAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Sankey"
                apiPath="/charts/sankey"
                dataProperty="data"
                controls={SankeyControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 1200,
                    height: 800,
                    data: JSON.stringify(this.props.data, null, '  '),
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },

                    align: 'justify',
                    colors: 'paired',

                    nodeOpacity: 0.75,
                    nodeWidth: 18,
                    nodePaddingX: 4,
                    nodePaddingY: 12,
                    nodeBorderWidth: 0,
                    nodeBorderColor: {
                        type: 'inherit:darker',
                        gamma: 0.4,
                    },

                    linkOpacity: 0.15,
                    // @todo: not yet supported by the API
                    // linkBlendMode: 'multiply',
                    // enableLinkGradient: true,
                    linkContract: 0,

                    enableLabels: true,
                    labelPosition: 'inside',
                    labelOrientation: 'vertical',
                    labelPadding: 16,
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 0.8,
                    },
                }}
            />
        )
    }
}
