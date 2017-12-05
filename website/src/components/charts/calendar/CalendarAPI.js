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
import CalendarControls from './CalendarControls'

export default class CalendarAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Calendar"
                apiPath="/charts/calendar"
                dataProperty="data"
                controls={CalendarControls}
                defaultProps={{
                    width: 600,
                    height: 400,
                    margin: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    },
                    from: this.props.from,
                    to: this.props.to,
                    data: JSON.stringify(this.props.data, null, '  '),
                    direction: 'horizontal',
                    yearSpacing: 40,
                    yearLegendOffset: 10,
                    daySpacing: 0,
                    dayBorderWidth: 1,
                    dayBorderColor: '#000000',
                    monthBorderWidth: 3,
                    monthBorderColor: '#000000',
                    monthLegendOffset: 10,
                }}
            />
        )
    }
}
