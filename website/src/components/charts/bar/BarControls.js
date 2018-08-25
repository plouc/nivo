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
import ChartControlGroups from '../../controls/ChartControlGroups'
import { getPropertiesGroupsControls } from '../../../lib/componentProperties'
import properties from './props'

const groupsByScope = {
    Bar: getPropertiesGroupsControls(properties, 'Bar'),
    BarCanvas: getPropertiesGroupsControls(properties, 'BarCanvas'),
    api: getPropertiesGroupsControls(properties, 'api'),
}

export default class BarControls extends PureComponent {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        scope: PropTypes.oneOf(Object.keys(groupsByScope)).isRequired,
    }

    render() {
        const { scope, settings, onChange } = this.props

        const groups = groupsByScope[scope]

        return (
            <ChartControlGroups
                ns="bar"
                scope={scope}
                settings={settings}
                onChange={onChange}
                groups={groups}
            />
        )
    }
}
