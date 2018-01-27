/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ChartControls from '../../controls/ChartControls'
import { getPropertiesGroupsControls } from '../../../lib/componentProperties'
import properties from './props'

const groupsByScope = {
    LineChartSvg: getPropertiesGroupsControls(properties, 'LineChartSvg'),
    LineChartCanvas: getPropertiesGroupsControls(properties, 'LineChartCanvas'),
    api: getPropertiesGroupsControls(properties, 'api'),
}

export default class LineControls extends PureComponent {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        scope: PropTypes.oneOf(Object.keys(groupsByScope)).isRequired,
    }

    render() {
        const { settings, onChange, scope } = this.props

        const groups = groupsByScope[scope]

        return <ChartControls ns="line" settings={settings} onChange={onChange} groups={groups} />
    }
}
