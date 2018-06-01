/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import omit from 'lodash/omit'
import APIClient from '../../api-client/APIClient'
import PieControls from './PieControls'
import propsMapper from './propsMapper'
import defaultProps from './defaultProps'

export default class PieAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Pie"
                apiPath="/charts/pie"
                dataProperty="data"
                controls={PieControls}
                propsMapper={propsMapper}
                defaultProps={{
                    ...omit(defaultProps, [
                        'startAngle',
                        'endAngle',
                        'sortByValue',
                        'animate',
                        'motionDamping',
                        'motionStiffness',
                        'isInteractive',
                    ]),
                    data: JSON.stringify(this.props.data, null, '  '),
                }}
            />
        )
    }
}
