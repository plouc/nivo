/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import ChartControls from '../../../controls/ChartControls'
import { getPropertiesGroupsControls } from '../../../../lib/componentProperties'
import properties from './props'

const groupsByScope = {
    SizeLegend: getPropertiesGroupsControls(properties, 'SizeLegend'),
}

export default class SizeLegendControls extends PureComponent {
    render() {
        const { settings, onChange } = this.props

        const groups = groupsByScope['SizeLegend']

        return (
            <ChartControls
                ns="legends"
                scope="SizeLegend"
                settings={settings}
                onChange={onChange}
                groups={groups}
            />
        )
    }
}
