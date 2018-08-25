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
    Bubble: getPropertiesGroupsControls(properties, 'Bubble'),
    BubbleHtml: getPropertiesGroupsControls(properties, 'BubbleHtml'),
    BubbleCanvas: getPropertiesGroupsControls(properties, 'BubbleCanvas'),
    api: getPropertiesGroupsControls(properties, 'api'),
}

export default class BubbleControls extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        settings: PropTypes.object.isRequired,
        scope: PropTypes.oneOf(Object.keys(groupsByScope)).isRequired,
    }

    render() {
        const { settings, scope, onChange } = this.props

        const groups = groupsByScope[scope]

        return (
            <ChartControlGroups
                ns="bubble"
                scope={scope}
                settings={settings}
                onChange={onChange}
                groups={groups}
            />
        )
    }
}
